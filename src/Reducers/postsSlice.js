import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create_User, fetch_get,create_post } from "../utils";

//create action

export const createPost = createAsyncThunk(
    "createPost",
    async (data, { rejectWithValue }) => {
        try {
            console.log("--1--send--post-", data);
            const response = await create_post(
                "http://192.168.1.197:8080/api/v1/media/addMedia",
                data
            );

            console.log("------2--send--post--");
            return response;
        } catch (error) {
            console.log("---3--send-error-post--");
            return rejectWithValue(error);
        }
    }
);

export const userPost = createSlice({
    name: "userPost",
    initialState: {
        user_post: [],
        loading: false,
        error: null,

    },
    reducers: {
        userPosts: (state, action) => {
            return { ...state, users: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.loading = false;
            state.user_post.push(action.payload);
        });
        builder.addCase(createPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });

    },
});

export const { userPosts } = userPost.actions;

export default userPost.reducer;