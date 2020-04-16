import { UserNotFoundError } from "../errors/UserNotFoundError";

export interface IUser {
  id: string;
  name: string;
  address: string;
}

export const User = (name, address): IUser => {
  return {
    id: Math.random().toString(),
    name,
    address,
  };
};

export const userDb: IUser[] = [
  User("foo", "some street"),
  User("bar", "some street"),
  User("baz", "some street"),
];

export class UserService {
  getUser(id: string) {
    const user = userDb.find((u) => u.id === id);
    if (!user) throw new UserNotFoundError(id);

    return user;
  }

  getAllUsers() {
    if (userDb.length < 1) throw Error("Uncontrolled error throw by database");

    return userDb;
  }
}
