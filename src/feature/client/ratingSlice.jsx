
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const RatingSlice = createSlice({
    name: 'RatingSliceName',
    initialState: {
       isRatingDataInserted: null,
       ratingData: [],
    },
    reducers: {
        clearIsRatingDataInserted: (state) => {
            state.isRatingDataInserted = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(InsertRatingDataThunk.fulfilled, (state, action) => {
            state.isRatingDataInserted = action.payload;
        })
        .addCase(GetAllRatingDataThunk.fulfilled, (state, action) => {
            state.ratingData = action.payload;
        })
    }
})

export const { clearIsRatingDataInserted } = RatingSlice.actions;
export const ratingDataTemp = state => state.RatingSliceName.ratingData;
export const isRatingDataInsertedTemp = state => state.RatingSliceName.isRatingDataInserted;
export const RatingSliceReducer = RatingSlice.reducer;

export const GetAllRatingDataThunk = createAsyncThunk(
    "RatingSliceName/GetAllRatingDataThunk",
    async () => {
        try {   
            const res = await fetch("http://localhost/petshopv2/server/client/rating.php?action=getAllRatingData", {    
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error', error);
        }

    }
)

export const InsertRatingDataThunk = createAsyncThunk(
    "RatingSliceName/InsertRatingDataThunk",
    async ({ ratingDataTemp }) => {
        try {
            const formData = new FormData();
            formData.append('ratingDataTemp', JSON.stringify(ratingDataTemp));

            const res = await fetch("http://localhost/petshopv2/server/client/rating.php?action=insertRatingData", {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error', error);
        }

    }
)