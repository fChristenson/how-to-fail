import * as express from "express";
import { batchService, userService } from "./libs/services";

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

// This is a global error handler.
// Errors that don't find a local handler will end up here.
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
});
