import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryBar, VictoryTheme, VictoryScatter, VictoryVoronoiContainer, VictoryAxis, VictoryGroup, VictoryTooltip } from 'victory'

function Weather() { 


    const today = new Date(); // Hakee Päivämäärän
    const date = today.getDate() + "." + parseInt(today.getMonth() + 1) + "." + today.getFullYear(); // Rakentaa Päivämäärän Muotoon: päivä.kuukausi.vuosi

    const initWeather = []; // asettaa säätietojen tilan
    const [weather, setWeather] = useState(initWeather);


    fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
        .then(response => response.json())
        .then(json => setWeather([...json])); // hakee kosteuden ja lämpötilan datan jason muodossa REST API rajapinnasta


    let chartTempDataDots = [];
    let chartTempDataLine = [];
    let charthumData = [];
    let chartTickFormat = [];
    let CountID = 0;
    const rows = () => weather.slice(0, 24).reverse().map(temphum => {
        const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + '.' + temphum.PublishedAt.split('T')[0].split('-')[1] + '.' + temphum.PublishedAt.split('T')[0].split('-')[0]
        const measurementTime = temphum.PublishedAt.split('T')[1].split(':')[0] + ':' + temphum.PublishedAt.split('T')[1].split(':')[1]
        chartTempDataDots.push({ x: String(measurementTime), y: parseInt(temphum.Temp) });
        chartTempDataLine.push({ experiment: String(measurementTime), actual: parseInt(temphum.Temp) });
        charthumData.push({ x: String(measurementTime), y: parseInt(temphum.Hum), label: parseInt(temphum.Hum)+"%" });
        chartTickFormat.push( String(measurementTime));
        return <div key={CountID++}> <b>Pvm: </b> {measurementDate}, <b>klo:</b> {measurementTime}--------<b>Ilmankosteus:</b> {temphum.Hum.split('.')[0]}%--------<b>Lämpötila:</b> {temphum.Temp.split('.')[0]}</div>
    }) // Loop Joka Parseroi Rajapinnasta Saatuja Tietoja Victorychartin Vaatimaan Muotoon

    const showTempDataDots = chartTempDataDots; // Lämpötila Victorychartin vaatimassa muodossa
    const showhumData = charthumData; // Kosteus Victorychartin Vaatimassa Muodossa
    const showTickFormat = chartTickFormat; // Kosteus Victorychartin Vaatimassa Muodossa

    

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
                domainPadding={{ x: 15, y: 50 }} //VictoryLine koko
                width={1400} // VictoryLine leveys
                height={350} // VictoryLine pituus

                containerComponent={<VictoryVoronoiContainer />}
>
                <VictoryGroup
                    color="#c43a31"
                    labels={({ datum }) => `y: ${datum.y},
                    x: ${datum.x}`}
                    
                
                    labelComponent={
                        <VictoryTooltip
                            style={{ fontSize: 20}}
                        /> 

                }

                data={showTempDataDots} // Lämpötila Data
                >
                <VictoryLine/>
                <VictoryScatter
                    size={({ active }) => active ? 8 : 3}
                    color="blue"

                />

                </VictoryGroup>

            </VictoryChart>

            <div>
                <h2>Ilmankosteus</h2>
            </div>

            <VictoryChart 
                theme={VictoryTheme.material}
                domainPadding={{ x: 150, y: 50 }} // VictoryBar koko
                width={1400} // VictoryBar leveys
                height={350} // VictoryBar Pituus
                > 


                <VictoryAxis
                     tickFormat={showTickFormat}
                />

                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x}`)}
                />

                <VictoryBar
                    data={showhumData} // Kosteuden Data
                />

            </VictoryChart>
        </div>

    )

}

export default Weather;