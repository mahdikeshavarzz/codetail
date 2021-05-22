import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React, { useState } from "react";
import axios from './Axios'
import "./styles.css"

const App = () => {

    const [state , setState ] = useState([]);
    const [totalConfirm , setTotalConfirmed ] = useState([]);
    const [totalRecovered, setTotalRecovered ] = useState([]);
    const [totalDeath , setTotalDeath ] = useState([]);
    const [loading , setLoading ] = useState(false);
    const [ country , setCountry] = useState('');
  
    React.useEffect(() => {
        setLoading(true)
        axios.get(`/summary`).then(res => {
            setState(res.data);
            console.log(res.data);
            setLoading(false)


            if(res.status === 200) {
                setTotalConfirmed(res.data.Global.TotalConfirmed);
                setTotalRecovered(res.data.Global.TotalRecovered);
                setTotalDeath(res.data.Global.TotalDeaths);
            }

        }).catch(err => {
            throw new Error(err)
        })

    },[])

if(loading) {
    return <h1>fetching data ...</h1>
}
const getCountryDetail = (countrySlug) => {
    axios.get(`/country/${countrySlug}/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`)
    const covidDetail = state.Countries.find(country => country.Slug === countrySlug);
    setTotalConfirmed(covidDetail.TotalConfirmed)
    setTotalRecovered(covidDetail.TotalRecovered);
    setTotalDeath(covidDetail.TotalDeaths)
}

const handleChange = (e) => {
    setCountry(e.target.value);
    getCountryDetail(e.target.value)
}

const handleWorld = () => {
    setTotalConfirmed(state.Global.TotalConfirmed);
    setTotalRecovered(state.Global.TotalRecovered);
    setTotalDeath(state.Global.TotalDeaths);
    setCountry('')
    {
        document.getElementById("h").innerHTML = "World info..."
    }
}




    return (
        <div>
         <div style={{backgroundColor:"black" , padding:"1rem 0",width:"100%",position:"fixed",top:"0"}}>
            <navbar >
                 <h3 style={{textAlign:"center",color:"whitesmoke"}}>Covid-19 Tracker</h3>
             </navbar>  
         </div>

         <div style={{marginLeft:"auto",marginRight:"auto",backgroundColor:"black",width:"max-content"}}>
          <h2 style={{textAlign:"center",marginTop:"6rem",padding:"1rem",color:"lightblue"}} id="h">{country ? country : "World info..."}</h2>
         </div>
          <div id="card" style={{display:"flex",justifyContent:"center",marginTop:"4rem"}}>
            <Card style={{marginInline:"1rem",marginBottom:"2rem",height:"160px",width:"200px",backgroundColor:"black",color:"orange",textAlign:"center",border:"4px solid orange"}}>
                <CardHeader title="Total Confirmed" />
                <CardContent>
                    <Typography> {totalConfirm} </Typography>
                </CardContent>
            </Card>
            <Card style={{marginBottom:"2rem",height:"160px",width:"200px",backgroundColor:"black",color:"lightgreen",textAlign:"center",border:"4px solid green"}}>
                <CardHeader title="Total Recovered" />
                <CardContent>
                    <Typography> {totalRecovered} </Typography>
                </CardContent>
            </Card>
            <Card style={{marginInline:"1rem",height:"160px",width:"200px",backgroundColor:"black",color:"red",textAlign:"center",border:"4px solid red"}}>
                <CardHeader title="Total Deaths" />
                <CardContent>
                    <Typography style={{marginTop:"1.97rem"}}> {totalDeath} </Typography>
                </CardContent>
            </Card>
          </div>
          <div id="dselect" style={{width:"300px",marginLeft:"auto",marginRight:"auto",display:"flex",justifyContent:"center",marginTop:"5rem"}}>
            <select value={country} onChange={handleChange}>
               <option value={""} disabled={true}>Select Country...</option>
               {
                   state.Countries && state.Countries.map(country => {
                       return <option key={country.Slug} value={country.Slug}>{ country.Country}</option>
                   })
               }
            </select>
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
            <button id="btn" onClick={handleWorld}>Reset Data</button>   
          </div>          
          <div style={{height:"100px"}} />
          <footer style={{position:"fixed",bottom:"0",backgroundColor:"black",width:"100%",padding:"1rem 0"}}>
              <h3 style={{color:"white",textAlign:"center"}}>design : Mahdi Keshavarz</h3>
          </footer>
        </div>
    )

}


export default App;