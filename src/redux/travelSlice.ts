import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

interface TravelState {
    startPoint_long: string;
    startPoint_lat: string;
    endPoint_long: string;
    endPoint_lat: string;
}

const initialState: TravelState = {
    startPoint_long: '',
    startPoint_lat: '',
    endPoint_long: '',
    endPoint_lat: '',
}

export const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        setStartPoint: (state, action) => {
            const {
                startPoint_long,
                startPoint_lat
            } = action.payload

            state.startPoint_long = startPoint_long;
            state.startPoint_lat = startPoint_lat;
        },
        setEndPoint: (state, action) => {
            const {
                endPoint_long,
                endPoint_lat
            } = action.payload

            state.endPoint_long = endPoint_long
            state.endPoint_lat = endPoint_lat
        },

    }


})

export const { setStartPoint, setEndPoint } = travelSlice.actions

export const selectTravel = (state: RootState) => state.travel;

export default travelSlice.reducer;