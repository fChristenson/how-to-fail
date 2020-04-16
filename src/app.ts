import * as express from "express";
import { batchService, userService, orderService } from "./libs/services";
import { User } from "./libs/services/UserService";
import { ErrorType } from "./libs/errors/StatusError";

export const app = express();

app.use(express.json());

// getUser can throw an error but we are letting the global handler deal with the error.
app.get("/users/:id", (req, res) => {
  const user = userService.getUser(req.params.id);
  res.json(user);
});

app.get("/batch", (req, res) => {
  const emails = [];
  // sendOrderEmails is an async operation that will run a long time
  // We don't want to wait for sendOrderEmails to finish before we respond to the client
  batchService.sendOrderEmails(emails);

  res.end("Running sendOrderEmails");
});

/**
 * Creating a order this way is dangerous.
 * orderService.createOrder only returns a empty value and our code is not checking for it.
 * If the order fails we will return a 200 and a empty order.
 * Our client will then have to check if the order was placed or not.
 */
app.post("/orders", (req, res) => {
  const user = User("foo", "street");
  const order = orderService.createOrder("id", user);
  res.json(order);
});

// This is a global error handler.
// Errors that don't find a local handler will end up here.
app.use((error, req, res, next) => {
  switch (error.type) {
    case ErrorType.NOT_FOUND_ERROR:
      // do something special for this error
      break;

    default:
      console.error(error);
      break;
  }

  res.status(error.status || 500).json({ error: error.message });
});
