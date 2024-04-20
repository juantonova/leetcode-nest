import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { RatingsModule } from './ratings/ratings.module';
import { SolutionsModule } from './solutions/solutions.module';
import { LoggerMiddleware } from './logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Solution } from './solutions/entities/solution.entity';
import { Rating } from './ratings/entities/rating.entity';
import { Comment } from './comments/entities/comment.entity';
import { dataSourceOptions } from './typeorm/data-source';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    CommentsModule,
    RatingsModule,
    SolutionsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User, Task, Solution, Rating, Comment]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
