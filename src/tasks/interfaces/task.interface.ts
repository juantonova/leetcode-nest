import { CategoryType } from 'src/enums/categories';
import { Tag } from 'src/enums/tags';

export interface Task {
  id: number;
  description: string;
  incoming_example: unknown;
  outgoing_example: unknown;
  tags: Tag[];
  category: CategoryType;
  additional_info?: string[];
  score: number;
  title: string;
}
