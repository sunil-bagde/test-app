import axios from "axios";

export async function login({ email, password }) {
	return axios.post("/api/login", {
		email,
		password,
	});
}
