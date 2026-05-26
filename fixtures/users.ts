export interface UserCredentials {
  username: string;
  password: string;
}

export const users: Record<string, UserCredentials> = {
  standard: { username: 'standard_user',  password: 'secret_sauce' },
  locked:   { username: 'locked_out_user', password: 'secret_sauce' },
  invalid:  { username: 'wrong_user',      password: 'wrong_pass'   },
};
