import { Comment } from 'src/comments/entities/comment.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Solution } from 'src/solutions/entities/solution.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: `${process.env.DB_URL}`,
  synchronize: true,
  logging: false,
  entities: [User, Task, Solution, Rating, Comment],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
};

export default dataSourceOptions;
