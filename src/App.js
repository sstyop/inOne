import { useRef, useState,useCallback,useMemo } from "react";
import { Input, Button } from "./components";
import { useDispatch, useSelector } from 'react-redux';
import {fetchWeather} from '../src/store/actions';

const App = (props) => {
	const [activeCityIndex, setActiveCityIndex] = useState(0);
	const inputRef = useRef();

	let cities = useMemo(() => {
    return ["yerevan", "moscow", "london", "paris", "madrid"];
  },[])

  const dispatch = useDispatch()
  const state = useSelector(state => state)

	const onSubmit = useCallback((number) => {
		if (activeCityIndex <= cities.length - 1) {
      dispatch(fetchWeather(cities[activeCityIndex],number))

			setActiveCityIndex(activeCityIndex + 1);
      inputRef.current.value = '';
		}
	},[activeCityIndex, cities, dispatch]);
  
  const storeAnswers = useCallback(() => {
    return state.weather.list.map((i, k) => {
      return <div className={`single-answer ${i.userNum - i.real < 5 ? 'right': ''}`} key={k}>
        <p>{i.userNum}</p>
        <p>Was {i.real}</p>
      </div>
    });
  },[state])
  
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
			{state.weather && <div className='last-answers'>
        {storeAnswers()}
      </div>
      }
		</div>
	);
};

export default App