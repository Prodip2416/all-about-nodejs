import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidatePipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isValidateStatus(value)){
            throw new BadRequestException(`${value}  is an invalid status`);
        }

        return value;
    }

    private isValidateStatus(status: any){
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}