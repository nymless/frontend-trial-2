import { rest } from "msw";
import { AppPaths } from "../../variables/AppPaths";
import { contacts, nextId } from "../resources/contacts";
import { Contact } from "../../redux/api/contactsAPI";

export const contactsHandlers = [
  rest.get(AppPaths.API_URL + "contacts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(contacts));
  }),

  rest.post(AppPaths.API_URL + "contacts", async (req, res, ctx) => {
    const formData = await req.json<Omit<Contact, "id" | "photo" | "small">>();
    const contact = { ...formData, id: nextId(), photo: "", small: "" };
    contacts.push(contact);
    return res(ctx.status(200));
  }),

  rest.put(AppPaths.API_URL + "contacts", async (req, res, ctx) => {
    const formData = await req.json<Omit<Contact, "photo" | "small">>();
    const contact = contacts.find((contact) => contact.id === formData.id);
    if (!contact) {
      return res(ctx.status(404));
    }
    contact.firstName = formData.firstName;
    contact.lastName = formData.lastName;
    contact.email = formData.email;
    contact.github = formData.github;
    contact.telegram = formData.telegram;
    contact.info = formData.info;
    return res(ctx.status(200));
  }),

  rest.delete(AppPaths.API_URL + "contacts/:id", (req, res, ctx) => {
    const idParam = req.params.id;
    if (typeof idParam !== "string") {
      return res(ctx.status(400));
    }
    const id = Number.parseInt(idParam);
    if (Number.isNaN(id)) {
      return res(ctx.status(404));
    }
    const isDeleted = contacts.some((contact, index) => {
      if (contact.id === id) {
        contacts.splice(index, 1);
        return true;
      }
      return false;
    });
    if (!isDeleted) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200));
  }),
];
