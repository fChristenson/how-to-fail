import { IUser } from "./UserService";

interface IOrder {
  id: string;
  productId: string;
  userId: string;
  name: string;
  address: string;
}

const Order = (productId, user: IUser): IOrder => {
  return {
    id: Math.random().toString(),
    productId,
    userId: user.id,
    name: user.name,
    address: user.address,
  };
};

const orders: IOrder[] = [];

export class OrderService {
  // sendOrder uses errors to communicate what went wrong.
  sendOrder(order: IOrder) {
    if (order.name.length < 1) {
      throw new Error("Order has no user name");
    } else if (order.address.length < 1) {
      throw new Error("Order has no address");
    } else {
      // send order
    }
  }

  // sendOrderV2 uses null to communicate that something went wrong but not what.
  sendOrderV2(order: IOrder) {
    if (order.name.length < 1) {
      return null;
    } else if (order.address.length < 1) {
      return null;
    } else {
      // send order
    }
  }

  /**
   * When there is only one possible thing that can go wrong returning a error value can be nice.
   * orders.find will only fail if none of the orders match the orderId.
   *
   * Some will state that we should throw an error here but is that always true?
   * What if the caller expects this order to be missing?
   * By returning a error value the caller can decide if this is considered an error or not.
   */
  maybeFindOrder(orderId: string): IOrder | undefined {
    const maybeOrder: IOrder | undefined = orders.find((o) => o.id === orderId);
    return maybeOrder;
  }

  /**
   * If we use good method names we can express our intent better.
   *
   * maybeFindOrder will let us safely check if an order is in our database.
   *
   * findOrder will check for us so we don't have to repeat error checking logic.
   *
   * When we know that the order should be in the database findOrder is better.
   */
  findOrder(orderId: string): IOrder {
    const maybeOrder: IOrder | undefined = orders.find((o) => o.id === orderId);

    if (!maybeOrder) throw new Error("Order not found");
    return maybeOrder;
  }

  /**
   * createOrder is an example of when using empty values is a bad idea.
   * If there is no productId we should throw an error.
   * There is no way we can deliver the order without it.
   */
  createOrder(productId: string, user: IUser) {
    if (productId.length < 1) {
      return Order("No id", user);
    } else {
      return Order(productId, user);
    }
  }

  /**
   * maybeCreateOrder is better than createOrder.
   * In createOrder we return null to the caller so that the caller can handle the error.
   *
   * There is still a problem however. The caller now needs to handle the null case.
   * Returning null is almost the same as throwing an error.
   * In both cases the caller has to deal with the error or the null.
   *
   * It is worth knowing that throwing an error will help identifying what was wrong.
   * Returning null removes the chance of the error not being caught before the system crashes.
   */
  maybeCreateOrder(productId: string, user: IUser): IOrder | null {
    if (productId.length < 1) {
      return null;
    } else {
      return Order(productId, user);
    }
  }
}
