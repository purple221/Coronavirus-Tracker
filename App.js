import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from './Map';
import "./App.css";
import Table from "./Table";
import {sortData} from "./util";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(()=> {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

  //STATE = how to write a variable in REACT

  //https://disease.sh/v3/covid-19/countries/

  //https://disease.sh/v3/covid-19/all


  //USEEFFECT = Run a pi e e of code based on a given condiiton

  useEffect(() => {
    //will run only once

    //async sends a request, wait for it, do something with that requested data

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
       const countries = data.map((country) => (
          {
            name:country.country, //United States, United Kingdom
            value: country.countryInfo.iso2 //UK, USA, FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);

      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setCountry(countryCode);

      //all of the data from the country response
      setCountryInfo(data);
    })
  }


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/*loop through all the countries and show 
              a drop down list of the options*/}
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              {/*<MenuItem value="worldwide">Worldwide</MenuItem>*/}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>

        </div>

        {/*map*/}
        <Map />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3> Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>

      </Card>
    </div>

    
  );
}

export default App;
