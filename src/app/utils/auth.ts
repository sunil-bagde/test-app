import { cookies as nextCookies } from "next/headers";

export function currentUser() {
  const cookies = nextCookies();

  if (cookies.get("currentUser")) {
    return JSON.parse(cookies.get("currentUser")?.value ?? `{}`);
  }

  return null;
}
