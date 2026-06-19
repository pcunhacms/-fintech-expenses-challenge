export type User = {
  id: string;
  email: string;
  name: string;
};

export type LoginResponse = {
  access_token: string;
  user?: User;
};
