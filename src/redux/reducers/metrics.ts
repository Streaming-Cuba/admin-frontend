import { createSlice } from "@reduxjs/toolkit"
import Video from "../../types/Video"

type SliceState = {
    videos: Video[]
}

const initialState: SliceState = {
    videos: []
}

export const metricsSlice = createSlice({
    name: "metrics",
    initialState: initialState,
    reducers: {
        setVideoReports: ((state, action) => {
            state.videos = action.payload
        })
    }
})

export const { setVideoReports } = metricsSlice.actions

export default metricsSlice.reducer