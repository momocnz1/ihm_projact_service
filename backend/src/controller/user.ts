import { BadRequestException, Body,Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import User from "../entities/user";
import { CreateuserDTO, UpdateuserDTO } from "../ihm/ihm.dto";
import  UserService  from "../service/user";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/auth/role.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { AuthService } from "src/auth/auth.service";


@Controller('user')
export class UserController {
  constructor(
    private readonly authService : AuthService,
    private readonly userService: UserService) {}
  @Delete(":id")
  deleteuserById(@Param('id') id :number) : string{
    console.log(id)
    this.userService.DeleteQuryBuilder(id)
    
    return "OK,It's done."
  }
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
  async postCreat(@Body() createuserDTO : CreateuserDTO): Promise<any>{  
      let user = await this.userService.creat(createuserDTO)
      return await this.authService.generateToken(user);
  
  }

  @Post(':id')
  @UsePipes(new ValidationPipe())
  postCreateWithId(@Param('id') id: number, @Body() createuserDTO: CreateuserDTO): Promise<User> {
    return this.userService.createWithId(id, createuserDTO)
  }



  @Post(':id/profile-image')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads', // ตำแหน่งที่ไฟล์จะถูกบันทึก
      filename: (req, file, cb) => {
        // กำหนดชื่อไฟล์ใหม่โดยใช้ timestamp และส่วนขยายไฟล์เดิม
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      // ตรวจสอบประเภทของไฟล์ที่อัปโหลดเพื่อให้ยอมรับเฉพาะไฟล์รูปภาพเท่านั้น
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }))



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