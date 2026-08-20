const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export interface ApiOptions extends RequestInit {
  token?: string;
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  } else if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('accessToken');
    if (stored) (headers as Record<string, string>)['Authorization'] = `Bearer ${stored}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, { ...fetchOptions, headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || 'Request failed');
  }

  return json;
}

export const publicApi = {
  getListings: (params?: Record<string, string>) =>
    api<{ data: unknown[]; meta?: unknown }>(`/properties/public/listings?${new URLSearchParams(params)}`),
  getListing: (slug: string) => api<{ data: unknown }>(`/properties/public/listings/${slug}`),
  getProducts: (params?: Record<string, string>) =>
    api<{ data: unknown[] }>(`/inventory/public/products?${new URLSearchParams(params)}`),
  getBlog: () => api<{ data: unknown[] }>('/cms/public/blog'),
  getBlogPost: (slug: string) => api<{ data: unknown }>(`/cms/public/blog/${slug}`),
  getTestimonials: () => api<{ data: unknown[] }>('/cms/public/testimonials'),
  getGallery: () => api<{ data: unknown[] }>('/cms/public/gallery'),
  getCareers: () => api<{ data: unknown[] }>('/cms/public/careers'),
  submitInquiry: (data: object) =>
    api('/properties/public/inquiries', { method: 'POST', body: JSON.stringify(data) }),
  applyCareer: (id: string, data: object) =>
    api(`/cms/public/careers/${id}/apply`, { method: 'POST', body: JSON.stringify(data) }),
};

export const authApi = {
  login: (email: string, password: string) =>
    api<{ data: { user: unknown; accessToken: string; refreshToken: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (data: object) =>
    api('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => api<{ data: unknown }>('/auth/me'),
  updateProfile: (data: object) =>
    api('/auth/profile', { method: 'PATCH', body: JSON.stringify(data) }),
};

export { API_URL };
