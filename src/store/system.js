import { createSlice } from "@reduxjs/toolkit";
import config from "config";

const initialState = {
	currentLangCode: config.DEFAULT_LANGUAGE,
	changeFilmType: 1
};

export const systemSlice = createSlice({
	name: "system",
	initialState,
	reducers: {
		changeLanguage: (state, action) => {
			return {
				...state,
				currentLangCode: action.payload
			};
		},
		changeFilmType: (state, action) => {
			return {
				...state,
				changeFilmType: action.payload
			};
		}
	}
});
// Action creators are generated for each case reducer function
export const { changeLanguage, changeFilmType } = systemSlice.actions;

export default systemSlice.reducer;
