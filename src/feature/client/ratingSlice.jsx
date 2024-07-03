
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";

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

        return HelperThunkFunction('client/rating.php?action=getAllRatingData', 'POST', null, false);

    }
)

export const InsertRatingDataThunk = createAsyncThunk(
    "RatingSliceName/InsertRatingDataThunk",
    async ({ ratingDataTemp }) => {

        const formData = HelperFormDataFunction(ratingDataTemp);
        
        return HelperThunkFunction('client/rating.php?action=insertRatingData', 'POST', formData, true);

    }
)