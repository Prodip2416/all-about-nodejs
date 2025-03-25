import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION || 'development',
  uploadPath: process.env.UPLOAD_FILE_PATH || 'development',
  uploadPublicPath: process.env.PUBLIC_UPLOAD_FILE_PATH || 'localhost:3000',
  publicDomain: process.env.PUBLIC_DOMIN || 'localhost:3000',
}));
