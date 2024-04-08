import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("accessToken");
	return config;
});

export default instance;
