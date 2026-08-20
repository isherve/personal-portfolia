import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import propertiesRoutes from './routes/properties.routes';
import crmRoutes from './routes/crm.routes';
import inventoryRoutes from './routes/inventory.routes';
import projectsRoutes from './routes/projects.routes';
import financeRoutes from './routes/finance.routes';
import hrRoutes from './routes/hr.routes';
import procurementRoutes from './routes/procurement.routes';
import fleetRoutes from './routes/fleet.routes';
import cmsRoutes from './routes/cms.routes';
import supportRoutes from './routes/support.routes';
import systemRoutes from './routes/system.routes';
import exportRoutes from './routes/export.routes';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Green Rock EMS API',
      version: '1.0.0',
      description: 'Enterprise Management Platform API for Green Rock General Supply Ltd',
    },
    servers: [{ url: config.apiUrl }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
};

export function createApp() {
  const app = express();
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: { origin: config.webUrl, credentials: true },
  });

  io.on('connection', (socket) => {
    socket.on('join', (userId: string) => socket.join(`user:${userId}`));
    socket.on('disconnect', () => {});
  });

  app.set('io', io);

  app.use(helmet());
  app.use(cors({ origin: config.webUrl, credentials: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { success: false, error: 'Too many requests' },
  });
  app.use('/api/', limiter);

  const publicLimiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
  app.use('/api/v1/properties/public', publicLimiter);
  app.use('/api/v1/inventory/public', publicLimiter);
  app.use('/api/v1/auth/register', publicLimiter);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'green-rock-api', timestamp: new Date().toISOString() });
  });

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  const v1 = express.Router();
  v1.use('/auth', authRoutes);
  v1.use('/dashboard', dashboardRoutes);
  v1.use('/properties', propertiesRoutes);
  v1.use('/crm', crmRoutes);
  v1.use('/inventory', inventoryRoutes);
  v1.use('/projects', projectsRoutes);
  v1.use('/finance', financeRoutes);
  v1.use('/hr', hrRoutes);
  v1.use('/procurement', procurementRoutes);
  v1.use('/fleet', fleetRoutes);
  v1.use('/cms', cmsRoutes);
  v1.use('/support', supportRoutes);
  v1.use('/system', systemRoutes);
  v1.use('/export', exportRoutes);

  app.use('/api/v1', v1);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return { app, httpServer, io };
}
