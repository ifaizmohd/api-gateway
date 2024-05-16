export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface RegisterUserResponse {
  message?: string;
}
