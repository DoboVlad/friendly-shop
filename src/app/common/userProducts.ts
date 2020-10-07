import { AuthenticatedUser } from './authenticatedUser';

export class UserProducts {
  _id: string;
  name: string;
  price: number;
  description: string;
  owner:{
    _id:number;
    firstName: string;
    lastName: string;
    email: string;
  };
  image: string;
}
