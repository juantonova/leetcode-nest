export type FindUserDto = {
  id: number;
  role: string;
  name: string;
  rating?: number;
  permissions: string[];
};
