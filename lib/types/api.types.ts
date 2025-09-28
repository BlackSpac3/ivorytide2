import { AxiosError, AxiosResponse } from "axios";

export type ApiResponseData<T = Record<string, never>> = {
  data: T;
  message: string;
  success: boolean;
  status: number;
};

export type ApiResponse<T = Record<string, never>> = AxiosResponse<
  ApiResponseData<T>
>;

export type ApiError = AxiosError<{
  error: string;
  message?: string;
  success: boolean;
  status: number;
}>;

export type IPagination = {
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  page_size: number;
  total_count: number;
  total_pages: number;
};

export type IOverview = {
  guests: number;
  invited: number;
  confirmed: number;
  declined: number;
};
