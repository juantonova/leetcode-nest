import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { RatingsModule } from './ratings/ratings.module';
import { SolutionsModule } from './solutions/solutions.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    CommentsModule,
    RatingsModule,
    SolutionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
