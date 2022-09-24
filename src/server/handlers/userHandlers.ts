import { rest } from "msw";
import { AppPaths } from "../../variables/AppPaths";
import { users } from "../resources/users";

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InVzZXItMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.x2mFXZmui1iJiqefGEKV6JyrP0syk5J5rYiGni4aTnE";

export const userHandlers = [
  rest.get(AppPaths.API_URL + "users/current", (req, res, ctx) => {
    const accessToken = req.cookies["access_token"];

    // Моковая верификация токена и декодинг id.
    if (accessToken === jwt) {
      return res(ctx.status(401));
    }
    const id = 1;

    const user = users.find((user) => user.id === id);

    if (!user) {
      return res(ctx.status(404));
    }

    const { password, ...rest } = user;
    return res(ctx.status(200), ctx.json({ data: { user: rest } }));
  }),
];
