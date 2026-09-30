export type TodoApiCategoryCode = 'PERS' | 'WORK' | 'STUDY';

export interface TodoApiDTO {
  task_id: string;
  task_title: string;
  category_code: TodoApiCategoryCode;
  is_completed: boolean;
  created_at_utc: string;
}