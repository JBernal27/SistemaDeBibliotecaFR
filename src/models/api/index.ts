export type ApiResponse<T, K extends string = 'data'> = {  [P in K]: T } & TStatusCode & ApiError;

type TStatusCode = {
  statusCode: number;
}

export type CustomErrorHandler = (error: unknown) => void;

export interface ApiError {
  error: string | string[];
  sqlState?: string;
}