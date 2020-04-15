import { UserNotFoundError } from "../errors/UserNotFoundError";

interface IUser {
  id: string;
  name: string;
}

const User = (name): IUser => {
  return {
    id: Math.random().toString(),
    name,
  };
};

const userDb: IUser[] = [User("foo"), User("bar"), User("baz")];

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
