export interface AuthPasswordRequestBody {
  login: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
}
