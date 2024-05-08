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
  price: number;
  menu_id: number;
  type_id: number;
}
export interface IUpdate {
  id: number;
  name: string;
  price: number;
  menu_id: number;
  type_id: number;
}
export interface IDelete {
  id: number;
}
