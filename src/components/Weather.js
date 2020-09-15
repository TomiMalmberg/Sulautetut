import React, { useState } from 'react'
import {VictoryChart, VictoryLine, VictoryBar, VictoryTheme, VictoryScatter, VictoryVoronoiContainer} from 'victory'

function Weather() {
  
    const data = [
        {quarter: "1.1", earnings: "25"},
        {quarter: "2.1", earnings: "35"},
        {quarter: "3.1", earnings: "40"},
        {quarter: "4.1", earnings: "45"},
        {quarter: "5.1", earnings: "40"},
        {quarter: "6.1", earnings: "55"}

    ]
    
    const today = new Date();
    const date = today.getDate() + "." + parseInt(today.getMonth()+1) + "." + today.getFullYear();

    const initWeather = [];
    const [weather, setWeather] = useState(initWeather);

    fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==')
      .then(response => response.json())
      .then(json => setWeather([...json]));

      const rows = () => weather.slice(0, 24).reverse().map(temphum => {
          return <div>{temphum.PublishedAt}-------{temphum.Hum}--------{temphum.Temp}</div>
      })

    return (
        <div aling="center">
            <div>
                <h3>Piirrettävän chartin raaka data</h3>
            </div>

            <div>
                <b> Tänään on: {date} </b>
            </div>

            <div>
                {rows()}
            </div>

            
        <h1> Lämpötila </h1>
   
      
        <VictoryChart
        domainPadding={{x: 30, y:10}}
            width={1000}
            height={250}
            
     containerComponent={
    <VictoryVoronoiContainer
      mouseFollowTooltips
      voronoiDimension="x"
      labels={({ datum }) => `y: ${datum.y },
      x: ${datum.x}`}
    />
  }
>

<VictoryScatter
  	style={{ data: { fill: "red" }, labels: { fill: "red" } }}
    data={[ 
        {x: "1.1", y:-10}, {x: "2.1", y:-5}, {x: "3.1", y:0}, {x: "4.1", y:2}, {x: "5.1", y:5}, {x: "6.1", y: 12}
    ]}
/>
        <VictoryLine
            data = {[
                {experiment: "1.1", actual: -10},
                {experiment: "2.1", actual: -5},
                {experiment: "3.1", actual: 0},
                {experiment: "4.1", actual: 2},
                {experiment: "5.1", actual: 5},
                {experiment: "6.1", actual: 12}
            ]}

            
        style={{data:
          
            {stroke: "blue", strokeWidth: 2}
        }}
        x="experiment"
        y="actual"
    />


    </VictoryChart>
    
        <div>
            <h2>Ilmankosteus</h2>
        </div>
 
    <VictoryChart

    const  color = "#969696"
         theme={VictoryTheme.material}
        domainPadding={{x: 30, y:10}}
            width={1000}
            height={250}>

        
            <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
/>
            <VictoryBar
            data={[
            {x: 1.1, y: 1,  label: "25%"},
            {x: 2.1, y: 2,  label: "35%"},
            {x: 3.1, y: 3,  label: "40%"},
            {x: 4.1, y: 4,  label: "45%"},
            {x: 5.1, y: 3,  label: "40%"},
            {x: 6.1, y: 5,  label: "55%"},
                      ]}
        />

        </VictoryChart>
        </div>
    
    )
    

        
     
}

export default Weather;