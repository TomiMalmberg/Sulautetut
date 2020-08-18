import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
const initJobs = [
{
  "id": 1,
"tyotehtava": "Lastenhoitaja"
},
{
  "id": 2,
  "tyotehtava": "Lakaisukoneen kuljettaja"
},
{
  "id": 3,
  "tyotehtava": "Muuttomies"
}

]  
const [jobs, setJobs] = useState(initJobs);

const rows = () => jobs.map(job => {
return <p>{job.tyotehtava}</p>

})
  return (
    <div className="App">
      <Header />
      {rows()} 
    
    </div>
  );
}

export default App;
