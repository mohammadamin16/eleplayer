import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'


const localFile = "./Family.Guy.S07E05.1080p.WEB-DL.x265.SoftSub.DonyayeSerial.mkv";

interface MainState {
    videoUrl?: string
}

const initialState: MainState = {
    videoUrl: localFile,
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setVideoUrl(state, action: PayloadAction<string>) {
            state.videoUrl = action.payload
        },
    },
})
export const mainReducer = mainSlice.reducer

export const mainActions = mainSlice.actions

