import coldbg from "./assets/cold.jpg"
import hotbg from "./assets/hot.jpg"
import "./App.css";
import Description from "./components/description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData} from './weather_service';

function App() {

  const [city, setCity] = useState('Paris');
  const [weather ,setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotbg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold = units === "metric" ? 20 : 68;
      if (data.temp <= threshold) setBg(coldbg);
      else setBg(hotbg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <><div className="App" style={{ backgroundImage: `url(${bg})`}}>
      {
        weather && (
      <div className="container">
      <br></br><br></br>
        <input onKeyDown={enterKeyPressed} className="cityname" type="text" name="city" placeholder='Enter City Name'></input>
        <button className="button" onClick={(e) => handleUnitsClick(e)}>°F</button>
        <br></br><br></br>
        <center>
        <div className="section_temperature">
          <p className="alignLeft">
            <h3> { `${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="weatherIcon" height='80' width='80'></img>
              <h3>{weather.description}</h3>
          </p>
          <p className="alignRight">
            <h1>{`${weather.temp.toFixed()} °${ units === "metric" ? "C" : "F"} `}</h1>
          </p>
        </div>
        </center>
        
        <Description weather={weather} units={units}>

        </Description>
      </div>
        )
      }
    </div></>
    
  );
}

export default App;
