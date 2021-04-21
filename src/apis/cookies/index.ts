import Cookies from "universal-cookie";

const TOKEN_COOKIE_NAME: string = "t";

class CookieManager {
  cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  setToken(value: string) {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    this.cookies.set(TOKEN_COOKIE_NAME, value, { path: "/", expires: now });
  }

  getToken(): string {
    return this.cookies.get(TOKEN_COOKIE_NAME);
  }
}

export default new CookieManager();
