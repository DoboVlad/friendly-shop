export class AuthenticatedUser {
  user: {
    _id: number,
    firstName: string,
    lastName: string,
    email: string
  }
  token: string;
}
