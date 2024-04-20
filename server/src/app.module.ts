import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilesModule } from './profiles/profiles.module';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
import { StageModule } from './stage/stage.module';
import { QaModule } from './qahistory/qahistory.module';
import { SkillsModule } from './skills/skills.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './utils/response.interceptor';
import { UserListModule } from './user-list/user-list.module';

@Module({
  imports: [
    PrismaModule,
    // AuthModule,
    ProfilesModule,
    // UserModule,
    StageModule,
    QaModule,
    SkillsModule,
    UserListModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
