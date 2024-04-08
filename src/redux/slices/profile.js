import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchProfile = createAsyncThunk("posts/fetchProfile", async () => {
	const {data} = await axios.get("/auth/profile");
	return data;
});

export const fetchUserLinks = createAsyncThunk("posts/fetchUserLinks", async () => {
	const {data} = await axios.get("/userLinks");
	return data;
});
export const fetchAvatar = createAsyncThunk("posts/fetchAvatar", async () => {
	const data = await axios.get("/file/avatar", {responseType: 'arraybuffer'})
		.then(response => {
			const blob = new Blob([response.data], {type: 'image/jpeg'});
			const img = URL.createObjectURL(blob)
			return img
		})
	return data
});


const initialState = {
	profile: {
		items: [],
		status: "loading",
	},
	links: {
		items: [],
		status: "loading",
	},
	avatar: {
		img: null,
		status: "loading",
	},
};

const linksSlice = createSlice({
	name: "links",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchProfile.pending]: (state) => {
			state.profile.status = "loading";
		},
		[fetchProfile.fulfilled]: (state, action) => {
			state.profile.items = action.payload;
			state.profile.status = "loaded";
		},
		[fetchProfile.rejected]: (state) => {
			state.profile.items = [];
			state.profile.status = "error";
		},
		[fetchUserLinks.pending]: (state) => {
			state.links.status = "loading";
		},
		[fetchUserLinks.fulfilled]: (state, action) => {
			state.links.items = action.payload;
			state.links.status = "loaded";
		},
		[fetchUserLinks.rejected]: (state) => {
			state.links.items = [];
			state.links.status = "error";
		},
		[fetchAvatar.pending]: (state) => {
			state.avatar.status = "loading";
		},
		[fetchAvatar.fulfilled]: (state, action) => {
			state.avatar.img = action.payload;
			state.avatar.status = "loaded";
		},
		[fetchAvatar.rejected]: (state) => {
			state.avatar.img = null;
			state.avatar.status = "error";
		},
	},
});

export const linksReducer = linksSlice.reducer;
