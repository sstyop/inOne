const FETCH_WEATHER = "FETCH_WEATHER";

export const WeatherReducer = (state = {list: []}, action) => {
	switch (action.type) {
		case FETCH_WEATHER:
        return {...state, list: [...state.list, action.payload]};
		default:
			return state;
	}
}
