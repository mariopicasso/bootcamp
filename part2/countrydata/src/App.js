
import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import {useState} from "react";

function CountryInfo({country}){
    console.log(country);
    const imgStyle= {
        width: '60%'
    }

    return(
        <div>
            <h3>{country.name}</h3>
            <div>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
            </div>
            <h4>Lenguages</h4>
            <div>
                {country.languages.map(language => <p key={language.iso639_1} >{language.name}</p>)}
            </div>
            <img src={country.flag} alt={"flag"} style={imgStyle}/>
        </div>
    )
}


function Country({country}){
    const [clicked, setClicked] = useState(false);
    const handleClick = () => setClicked((lastValue) => lastValue ? false : true);
    const divStyle={
        display: "flex",
        flexDirection: "row",
        justifyContent: "center", 

    }
    if (clicked){
        return(
            <CountryInfo country={country}/>
        )
    }
    return(
        <div style={divStyle}>
            <p>{country.name}</p>
            <button onClick={handleClick}>Show</button>
        </div>
    );
}

function CountryInputManage({matchedCountries}){
    if (matchedCountries.length === 0){
        return(
            <p>...</p>
        )
    }
    
    else if (matchedCountries.length >= 10){
        return(
            <p>Too many matches, specify more</p>
        )
    }

    else if (matchedCountries.length > 1 && matchedCountries.length < 10){
        return(
            <div>
                {matchedCountries.map(country =><Country key={country.numericCode} country={country}/>)}
            </div>
        );
    }
    else{
        return (
            <div>
                <CountryInfo country = {matchedCountries[0]}/>
            </div>
        )
    } 
}

function App() {
    const [search, setNewSearch] = useState("");
    const [countryData, setCountryData]= useState([]);
    const [matchedCountries, setMatchedCountries] = useState([]);

    const handleSearchChange = (e) => {
        setNewSearch(e.target.value);
        setMatchedCountries (countryData.filter((country)=>country.name.toUpperCase().includes(search.toUpperCase())));
    }

    
    useEffect(()=>{
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response=>{
                setCountryData(response.data);
            })
    },[])


    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Country Data</h1>
            </header>
            <main>
                <div>
                    <h2>Search a country</h2>
                    <input type="text" onChange={handleSearchChange}/>
                </div>
                <CountryInputManage matchedCountries={matchedCountries}/>
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
