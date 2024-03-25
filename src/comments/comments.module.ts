import { Module } from '@nestjs/common';
import { CommentsService } from './Comments.service';
import { CommentsController } from './Comments.controller';
import { CommentsRepository } from './Comments.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService],
})
export class CommentsModule {}
