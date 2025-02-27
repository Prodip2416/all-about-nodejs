import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { createUserDTO, updateUserDTO } from 'src/users/dtos/createUserDTO.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserServiceService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //get all users
  getAllUsers() {
    return this.userRepository.find();
  }
  getById(id) {
    return this.userRepository.findOne({where: {id}});
  }
  //craete a new user
  createUser(userDTO: createUserDTO) {
    const newUser = this.userRepository.create({
      ...userDTO,
    });

    return this.userRepository.save(newUser);
  }

  //update a new user
  updateUser(id: number, updateUserDTO: updateUserDTO) {
    return this.userRepository.update(
      { id },
      {
        createAt: new Date(),
        ...updateUserDTO,
      },
    );
  }
  //delete a new user
  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
