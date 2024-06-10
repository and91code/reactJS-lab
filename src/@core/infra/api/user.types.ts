export interface IGetAll {
  search?: {
    name?: string;
    // email?: string;
  };
}
export interface IGetById {
  id: number;
}
export interface ICreate {
  name: string;
  username: string;
  email: string;
}
export interface IUpdate {
  id: number;
  name: string;
  username: string;
  email: string;
}
