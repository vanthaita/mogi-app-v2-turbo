export class UserDto {
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  picture: string;
  providerId: string;
}

export class SignInDto {
  email: string;
  password: string;
}

export class SignUpDto {
  name: string;
  email: string;
  password: string;
}
