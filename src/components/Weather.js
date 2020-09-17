import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryBar, VictoryTheme, VictoryScatter, VictoryVoronoiContainer } from 'victory'

function Weather() {


    const today = new Date();
    const date = today.getDate() + "." + parseInt(today.getMonth() + 1) + "." + today.getFullYear();

    const initWeather = [];
    const [weather, setWeather] = useState(initWeather);


    fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
        .then(response => response.json())
        .then(json => setWeather([...json]));


    let chartTempDataDots = [];
    let chartTempDataLine = [];
    let charthumData = [];
    let chartData = [];
    const rows = () => weather.slice(0, 24).reverse().map(temphum => {
        const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + '.' + temphum.PublishedAt.split('T')[0].split('-')[1] + '.' + temphum.PublishedAt.split('T')[0].split('-')[0]
        const measurementTime = temphum.PublishedAt.split('T')[1].split(':')[1] + ':' + temphum.PublishedAt.split('T')[1].split(':')[1]
        chartTempDataDots.push({ x: String(measurementTime), y: parseInt(temphum.Temp) });
        chartTempDataLine.push({ experiment: String(measurementTime), actual: parseInt(temphum.Temp) });
        charthumData.push({ xbar: String(measurementTime), ybar: parseInt(temphum.Hum)+"%" });
        chartData.push({ quarter: String(measurementTime), earnings: parseInt(temphum.Hum) });
        return <div> <b>Pvm: </b> {measurementDate}, <b>klo:</b> {measurementTime}--------<b>Ilmankosteus:</b> {temphum.Hum.split('.')[0]}%--------<b>Lämpötila:</b> {temphum.Temp.split('.')[0]}</div>
    })

    console.log(chartTempDataDots);
    const showTempDataDots = chartTempDataDots;
    console.log(chartTempDataLine);
    const showTempDataLine = chartTempDataLine;
    console.log(charthumData);
    const showhumData = charthumData;
    console.log(chartData);
    const showData = chartData;

    

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
                domainPadding={{ x: 30, y: 10 }}
                width={1000}
                height={250}

                containerComponent={
                    <VictoryVoronoiContainer
                        mouseFollowTooltips
                        voronoiDimension="x"
                        labels={({ datum }) => `y: ${datum.y},
      x: ${datum.x}`}
                    />
                }
            >

                <VictoryScatter
                    style={{ data: { fill: "red" }, labels: { fill: "red" } }}
                    data={showTempDataDots}
                />
                <VictoryLine
                    data={showTempDataLine}


                    style={{
                        data:

                            { stroke: "blue", strokeWidth: 2 }
                    }}
                    x="experiment"
                    y="actual"
                />


            </VictoryChart>

            <div>
                <h2>Ilmankosteus</h2>
            </div>

            <VictoryChart

                const color="#969696"
                theme={VictoryTheme.material}
                domainPadding={{ x: 30, y: 10 }}
                width={1000}
                height={250}>


                <VictoryBar
                    data={showData}
                    x="quarter"
                    y="earnings"
                />
                <VictoryBar
                    data={showhumData}
                />

            </VictoryChart>
        </div>

    )




}

export default Weather;