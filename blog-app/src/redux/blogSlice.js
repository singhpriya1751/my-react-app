import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [
        { id: 1, coverImage: "../../src/assets/images/img1.jpg", title: "First Blog", content: "This is the first blog content" },
        { id: 2, coverImage: "../../src/assets/images/img2.jpg", title: "Second Blog", content: "This is the second blog content" },
        { id: 3, coverImage: "../../src/assets/images/img3.jpg", title: "Third Blog", content: "This is the Third blog content" },
        { id: 4, coverImage: "../../src/assets/images/img4.jpg", title: "Forth Blog", content: "This is the Forth blog content" },
        { id: 5, coverImage: "../../src/assets/images/img5.jpg", title: "Fifth Blog", content: "This is the Fifth blog content" },
        { id: 6, coverImage: "../../src/assets/images/img6.jpg", title: "Sixth Blog", content: "This is the second blog content" },
        { id: 7, coverImage: "../../src/assets/images/img7.jpg", title: "Seventh Blog", content: "This is the first blog content" },
        { id: 8, coverImage: "../../src/assets/images/img8.jpg", title: "Eighth Blog", content: "This is the second blog content" },
    ],
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        editPost: (state, action) => {
            const { id, updatedPost } = action.payload;
            const index = state.posts.findIndex(post => post.id === id);
            if (index !== -1) {
                state.posts[index] = updatedPost;
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
    },
});

export const { addPost, editPost, deletePost } = blogSlice.actions;
export default blogSlice.reducer;
