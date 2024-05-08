export interface IGetAll {
  search?: {
    name?: string;
  };
}
export interface IGetById {
  id: number;
}
export interface ICreate {
  name: string;
  user_id: number;
}
export interface IUpdate {
  id: number;
  name: string;
  user_id: number;
}
export interface IDelete {
  id: number;
}
