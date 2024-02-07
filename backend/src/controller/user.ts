import { Body,Controller, Delete, Get, Param, Post, Put, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import User from "../entities/user";
import { CreateuserDTO, UpdateuserDTO } from "../ihm/ihm.dto";
import  UserService  from "../service/user";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/auth/role.enum";


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('status')
  getStatus() : string{
    return this.userService.getstatus();
  }

  @Get()
  getIndex(@Req() request : Request): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
    getByid(@Param('id') id : number) : Promise<User>{
        return this.userService.findOne(id)
  }

  @Put(":id")
    updateUserById(@Param('id') id: number, @Body() updateuserDTO: UpdateuserDTO): Promise<User> {
      return this.userService.update(id, updateuserDTO);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  postCreat(@Body() createuserDTO : CreateuserDTO): Promise<User>{
    return this.userService.creat(createuserDTO)
  }

  @Delete(":id")
  deleteuserById(@Param('id') id :number) : string{
    this.userService.DeleteQuryBuilder(id)
    return "OK,It's done."
  }

  @Roles(Role.Admin, Role.User)
  @Get('bothUsers')
  bothRoles(){
    return 'Both User and Admin';
  }

  @Roles(Role.Admin)
  @Get('onluadmin')
  onlyadmin(){
    return 'Only Admin';
  }

  @Roles(Role.User)
  @Get('onlyuser')
  onlyUser(){
    return 'Only User'
  }
}