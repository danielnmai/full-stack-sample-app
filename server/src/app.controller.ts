import { Controller, Get } from '@nestjs/common';
// import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
// import { UserDto } from './users/dto/user.dto';

@Controller()
@ApiTags('health check')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/ping')
  ping() {
    return this.appService.ping();
  }
}
