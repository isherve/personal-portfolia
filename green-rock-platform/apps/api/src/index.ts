import { createApp } from './app';
import { config } from './config';

const { httpServer } = createApp();

httpServer.listen(config.port, () => {
  console.log(`🚀 Green Rock API running on http://localhost:${config.port}`);
  console.log(`📚 Swagger docs at http://localhost:${config.port}/api/docs`);
});
