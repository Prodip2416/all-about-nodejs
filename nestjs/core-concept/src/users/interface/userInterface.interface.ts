export interface UserResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}
export interface User {
  username: string;
  email: string;
  age: string;
}
