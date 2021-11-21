import { useRef, useState,useCallback } from "react";
import { Input, Button } from "./components";

const App = () => {
	const [activeCityIndex, setActiveCityIndex] = useState(0);
	const [trueAnswers, setTrueAnswers] = useState(0);
	const [answers, setAnswers] = useState({});

	const inputRef = useRef();

	let cities = ["yerevan", "moscow", "london", "paris", "madrid"];

	const onSubmit = (number) => {
		if (activeCityIndex <= cities.length - 1) {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${cities[activeCityIndex]}&units=metric&appid=9cff733aee57cb05b63dd4f731c46bc4`
			)
				.then((response) => response.json())
				.then((data) => {
					if (number - data.main.temp < 5) {
						setTrueAnswers(trueAnswers + 1);
					}

					let currObj = {
						[activeCityIndex]: {
							real: data.main.temp,
							userSuggested: number,
						},
					};

					let obj = Object.assign(answers, currObj);

					setAnswers(obj);
				});

			setActiveCityIndex(activeCityIndex + 1);
		}
	};
  
  const storeAnswers = useCallback(() => {
    return Object.keys(answers).map((i, k) => {
      return <div className='single-answer' key={k}>
        <p>{answers[i].userSuggested}</p>
        <p>Was {answers[i].real}</p>
      </div>
    });
  },[answers])

	return (
		<div className='App'>
			<div className='block'>
				<h2>{cities[activeCityIndex]}</h2>
				<Input ref={inputRef} type='number' />
				<Button
					type='button'
					text='Check'
					disabled={activeCityIndex === cities.length ? true : false}
					onClick={() => onSubmit(inputRef.current.valueAsNumber)}
				/>
			</div>
			<div className='last-answers'>
        {storeAnswers()}
      </div>
		</div>
	);
};

export default App;
