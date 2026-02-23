import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { UploadFile } from '../interfaces/upload-file.interface';
// import { UploadToAwsProvider } from './upload-to-aws.provider';
import { fileTypes } from '../enums/file-types.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadsService {
  constructor(
    // private readonly uploadToAwsProvider: UploadToAwsProvider,

    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    // throw error for unsupported file types
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('MIME type not supported');
    }

    try {
      // Upload file to AWS S3 bucket
      // const path = await this.uploadToAwsProvider.fileupload(file);
      const path = await this.saveToLocalFile(file);
      // Generate a new record in upload table
      const uploadFile: UploadFile = {
        name: path,
        path,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };
      // create an upload
      const upload = this.uploadsRepository.create(uploadFile);
      // save the details to database
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  private async saveToLocalFile(file: Express.Multer.File): Promise<string> {
    const uploadsDir = path.resolve(process.cwd(), 'upload-files');
    await fs.mkdir(uploadsDir, { recursive: true });

    const originalName = file.originalname || 'upload';
    const ext = path.extname(originalName);
    const filename = `${Date.now()}-${randomUUID()}${ext}`;
    const destPath = path.join(uploadsDir, filename);

    if (file.buffer && file.buffer.length > 0) {
      await fs.writeFile(destPath, file.buffer);
    } else if (file.path) {
      await fs.copyFile(file.path, destPath);
    } else {
      throw new BadRequestException('File buffer missing');
    }

    return path.posix.join('upload-files', filename);
  }
}
