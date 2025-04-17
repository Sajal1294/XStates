import React, { useEffect, useState } from "react"

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
            setCities(Array.isArray(res_json)?res_json:[]);
            setSelectedCity("");
            
        } catch (error) {
            console.error("Failed to load countries:"+error);
            setCities([]);
            
        }
    };

    fetchcities();
},[selectedState, selectedCountry]);



    


    return(
        <div>
            <h1>Select Location</h1>
            <select style={{
                marginRight:"10px",
                height:"40px"
            }} value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)}>
                <option>Select Country</option>
                {
                    countries.map((country)=>(
                        <option key={country} value={country}>{country}</option>
                    )
                )}
            </select>

            <select style={{
                marginRight:"10px",
                height:"40px"
            }}
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>


            <select style={{
                marginRight:"10px",
                height:"40px"
            }} value={selectedCity}
                    onChange={(e)=>setSelectedCity(e.target.value)}
                    disabled={!selectedState}>
                <option>Select City</option>
                {
                    cities.map((city)=>(
                        <option value={city} key={city}>
                            {city}
                            </option>
                    ))
                }
            </select>

            {selectedCity && (
                <p style={{
                    fontWeight:"bold"
                }}> You selected <span style={{
                    
                    fontSize:"1.5rem"
                }}>{selectedCity}</span>,<span style={{
                    opacity:"60%"
                }}>{selectedState} , {selectedCountry}</span></p>
            )

            }



        </div>
    )

}

export default CitySelector;