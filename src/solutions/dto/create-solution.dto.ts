import { Solution } from '../interfaces/solution.interface';

export type CreateSolutionDto = Omit<Solution, 'id'>;
