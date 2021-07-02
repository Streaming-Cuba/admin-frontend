import {createSlice} from "@reduxjs/toolkit"
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
        setVideoReports: (state, action) => {
            state.videos.push(action.payload)
        },
        removeVideoReports: (state, action) => {
            state.videos = state.videos.filter(video => (
                video.id !== action.payload.id
            ))
        },
        clearVideos: (state) => {
            state.videos = []
        }
    }
})

export const { setVideoReports, removeVideoReports, clearVideos } = metricsSlice.actions

export default metricsSlice.reducer