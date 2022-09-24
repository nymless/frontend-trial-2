const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.REACT_APP_BASE_URL;

export class AppPaths {
  static API_URL = `${BASE_URL}/api/`;
  static IMG_URL = `${BASE_URL}/static/img/`;
}
