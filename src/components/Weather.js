import React from 'react'
import {VictoryChart, VictoryLine, VictoryBar, VictoryAxis, VictoryTheme} from 'victory'

function Weather() {
  
    const data = [
        {quarter: 1, earnings: 1600},
        {quarter: 2, earnings: 1500},
        {quarter: 3, earnings: 1400},
        {quarter: 4, earnings: 1200},
        {quarter: 5, earnings: 1000}
    ]
    return (
        <div aling="middle">
        <h1> Lämpötila </h1>
   
      
        <VictoryChart
        domainPadding={{x: 30, y:10}}
            width={1000}
            height={250}>

        <VictoryLine
            data={[
                {experiment: "1.1.", actual: -10},
                {experiment: "2.1.", actual: -5},
                {experiment: "3.1.", actual: 0},
                {experiment: "4.1.", actual: 2},
                {experiment: "5.1.", actual: 5},
                {experiment: "6.1.", actual: 12}
            ]}
            
        style={{data:
            {stroke: "green", strokeWidth: 2}
        }}
        x="experiment"
        y="actual"
    />
    </VictoryChart>
    
        <div>
            <h2>Ilmankosteus</h2>
        </div>
 
    <VictoryChart
        domainPadding={{x: 30, y:10}}
            width={1000}
            height={250}>
<VictoryTheme
    theme={VictoryTheme.material}
    domainPadding={20}
/>

<VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["1600", "1400", "1200", "1000", "900"]}
          />


        
            <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
        
        />
        </VictoryChart>
        </div>
    
    )
    

        
     
    
}

export default Weather;