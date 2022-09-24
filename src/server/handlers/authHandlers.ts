import { rest } from "msw";
import { AppPaths } from "../../variables/AppPaths";
import { LoginValues } from "../../components/LoginForm/LoginForm";
import { users } from "../resources/users";

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InVzZXItMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.x2mFXZmui1iJiqefGEKV6JyrP0syk5J5rYiGni4aTnE";

export const authHandlers = [
  rest.post(AppPaths.API_URL + "auth/login", async (req, res, ctx) => {
    const {
      loginCredentials: { email, password },
    } = await req.json<{
      loginCredentials: LoginValues;
    }>();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return res(ctx.status(404));
    }

    // Моковое создание токена
    const token = jwt;

    return res(
      ctx.status(200),
      ctx.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 3600,
      }),
      ctx.cookie("logged_in", "true", {
        maxAge: 3600,
      })
    );
  }),
];
