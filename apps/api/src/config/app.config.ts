import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Firma Segura API
  firmaSegura: {
    baseUrl: process.env.FIRMASEGURA_BASE_URL || 'https://api.dev-firmaseguraec.com',
    bearerToken: process.env.FIRMASEGURA_BEARER,
  },
  
  // File upload limits
  upload: {
    maxImageMb: parseInt(process.env.MAX_IMAGE_MB, 10) || 5,
    maxPdfMb: parseInt(process.env.MAX_PDF_MB, 10) || 10,
    maxVideoMb: parseInt(process.env.MAX_VIDEO_MB, 10) || 10,
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h',
  },
}));
