export interface ResultRequestDTO<T> {
  isSuccess: boolean;
  value: T;
  error: string;
}