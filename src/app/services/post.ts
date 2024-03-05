import axios from "axios";
import { POSTS_API } from "@/app/constants/routes";
import { SITE_URL } from "@/app/config";

export async function getPosts() {
	try {
		return axios.get(SITE_URL + POSTS_API);
	} catch (err) {
		return { data: [] };
	}
}
