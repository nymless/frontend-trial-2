import { setupWorker } from "msw";
import { contactsHandlers } from "./handlers/contactsHandlers";
import { userHandlers } from "./handlers/userHandlers";
import { authHandlers } from "./handlers/authHandlers";

export const worker = setupWorker(
  ...contactsHandlers,
  ...userHandlers,
  ...authHandlers
);
