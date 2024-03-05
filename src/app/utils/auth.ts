import { cookies as nextCookies } from "next/headers";
import { JWT_SECRET_KEY } from "@/app/constants/auth";
export function currentUser() {
	const cookies = nextCookies();

	if (cookies.get("currentUser")) {
		return JSON.parse(cookies.get("currentUser")?.value ?? `{}`);
	}

	return null;
}

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.')
  }

  return JWT_SECRET_KEY
}