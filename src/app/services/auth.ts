import axios from "axios";
import { LOGIN_API } from "@/app/constants/routes";

interface LoginParam {
	email: string;
	password: string;
}
export async function login({ email , password } :LoginParam) {
	return axios.post(LOGIN_API, {
		email,
		password,
	});
}
