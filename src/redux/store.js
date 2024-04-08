import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth";
import {linksReducer} from "./slices/profile";

const store = configureStore({
	reducer: {
		links: linksReducer,
		auth: authReducer,
	},
});

export default store;
