import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return await response.json();
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE",
    });
    return userId;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, updatedData }) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return { id, updatedData };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "pending",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.users.findIndex((user) => user.id === id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...updatedData };
        }
      });
  },
});

export const selectAllUsers = (state) => state.users.users;

export default userSlice.reducer;
