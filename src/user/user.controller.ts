import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserEmailFail } from './dto/create-user.response.dto';

@Controller('api/user')
@ApiTags('Actor Router')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Update actor information by username' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'status.OK',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: createUserEmailFail.error,
    schema: { example: createUserEmailFail },
    // description: CommonMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    // description: CommonMessage.INTERNAL_SERVER_ERROR,
  })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Get('all')
  // findAll() {
  //   return this.userService.users();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.fi;
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
