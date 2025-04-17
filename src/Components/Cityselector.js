import React, { useEffect, useState } from "react"
import styles from "./Cityselector.css";

function CitySelector(){

const [countries,setCounties]=useState([]);
const [states,setStates]=useState([]);
const [cities,setCities]=useState([]);

const [selectedCountry,setSelectedCountry]=useState("");
const [selectedState,setSelectedState]=useState("");
const [selectedCity,setSelectedCity]=useState("");


useEffect(()=>{
    const fetchcountries=async ()=>{
       
        try {
            const res = await fetch("https://crio-location-selector.onrender.com/countries");
            const res_json= await res.json();
            setCounties(res_json);
            
        } catch (error) {
            console.error("Failed to load Countries:"+error);
            
        }
    };
    fetchcountries();

},[]);


useEffect(() => {
    const fetchStates = async () => {
      if (!selectedCountry) return;

      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        const data = await res.json();
        setStates(data);
        setSelectedState('');
        setSelectedCity('');
        setCities([]);
      } catch (err) {
        console.error('Failed to load states:', err);
      }
    };

    fetchStates();
  }, [selectedCountry]);


useEffect(() => {
    const fetchcities=async ()=>{
        if(!selectedCountry || !selectedState) return;
       
        try {
            const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
            const res_json= await res.json();
            setCities(res_json);
            setSelectedCity("");
            
        } catch (error) {
            console.error("Failed to load countries:"+error);
            setCities([]);
            
        }
    };

    fetchcities();
},[selectedState, selectedCountry]);



    


    return(
        <div className={styles["city-selector"]}>
      <h1>Select Location</h1>
      <div className={styles.dropdowns}>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={styles.dropdown}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
          className={styles.dropdown}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          className={styles.dropdown}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h2 className={styles.result}>
          You selected <span className={styles.highlight}>{selectedCity}</span>,
          <span className={styles.fade}>
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
    )

}

export default CitySelector;