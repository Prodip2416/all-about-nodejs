import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { Upload } from '../uploads.entity';
import { format } from 'date-fns';
import { FileTypes } from '../enums/file-type.enum';

@Injectable()
export class UploadsService {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('File type not supported');
    }
    const uploadPath: string =
      this.configService.get('appConfig.uploadPath') ?? 'attachment';
    const publicUploadPath: string =
      this.configService.get('appConfig.uploadPublicPath') ?? 'localhost:3000';
    const publicDomain: string =
      this.configService.get('appConfig.publicDomain') ?? 'localhost:3000';

    const absoluteUploadDir = path.resolve(process.cwd(), uploadPath);
    const parsedFile = path.parse(file?.originalname?.replace(/ /g, '_'));
    const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
    const uniqueFilename = `${parsedFile.name}_${timestamp}${parsedFile.ext}`;
    const serverFilePath = path.join(uploadPath, uniqueFilename);
    const publicUrl = `${publicDomain}${publicUploadPath}/${uniqueFilename}`;
    // console.log(uniqueFilename);
    // console.log(serverFilePath);
    try {
      if (!fs.existsSync(absoluteUploadDir)) {
        fs.mkdirSync(absoluteUploadDir, { recursive: true });
      }

      fs.writeFileSync(serverFilePath, file.buffer);

      const upload = this.uploadsRepository.create({
        name: uniqueFilename,
        path: serverFilePath,
        url: publicUrl,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      });
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
