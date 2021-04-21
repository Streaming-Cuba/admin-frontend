import {createSlice} from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isSidebarOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleSidebar } = layoutSlice.actions

export default layoutSlice.reducer