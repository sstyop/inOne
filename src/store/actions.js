import axios from "axios";

const FETCH_WEATHER = "FETCH_WEATHER";

export const fetchWeather = (city,userNum) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9cff733aee57cb05b63dd4f731c46bc4`;
	return (dispatch) => {
        axios.get(url).then((res) => {
            dispatch({
                    type: FETCH_WEATHER,
                    payload: {'real': res.data.main.temp,userNum},
                }
            )
        })
    };
}
