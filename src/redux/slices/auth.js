import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
	const {data} = await axios.post("/auth", params);
	return data;
});
export const fetchProfile = createAsyncThunk("auth/fetchProfile", async () => {
	const {data} = await axios.get("/userLinks");
	return data;
});
export const fetchRegister = createAsyncThunk(
	"auth/fetchRegister",
	async (params) => {
		const {data} = await axios.post("/user/registry", params);
		return data;
	}
);
export const fetchShortLink = createAsyncThunk(
	"auth/fetchShortLink",
	async (params) => {
		const {data} = await axios.put("/link", params);
		return data;
	}
);
const initialState = {
	data: null,
	status: "loading",
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		},
	},
	extraReducers: {
		[fetchAuth.pending]: (state) => {
			state.status = "loading";
			state.data = null;
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.status = "loaded";
			state.data = action.payload;
		},
		[fetchAuth.rejected]: (state) => {
			state.status = "error";
			state.data = null;
		},
		[fetchProfile.pending]: (state) => {
			state.status = "loading";
			state.data = null;
		},
		[fetchProfile.fulfilled]: (state, action) => {
			state.status = "loaded";
			state.data = action.payload;
		},
		[fetchProfile.rejected]: (state) => {
			state.status = "error";
			state.data = null;
		},
		[fetchRegister.pending]: (state) => {
			state.status = "loading";
			state.data = null;
		},
		[fetchRegister.fulfilled]: (state) => {
			state.status = "loaded";
			state.data = true;
		},
		[fetchRegister.rejected]: (state) => {
			state.status = "error";
			state.data = null;
		},
		[fetchShortLink.pending]: (state) => {
			state.status = "loading";
			state.data = null;
		},
		[fetchShortLink.fulfilled]: (state) => {
			state.status = "loaded";
			state.data = true;
		},
		[fetchShortLink.rejected]: (state) => {
			state.status = "error";
			state.data = null;
		},
	},
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectIsRegister = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;
