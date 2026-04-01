import Bars from './bars';
import XAxis from './xAxis';
import YAxis from './yAxis';

function BarChart(props){
    const {
        offsetX,
        offsetY,
        data,
        xScale,
        yScale,
        height,
        width,
        selectedStation,
        onBarMouseEnter,
        onBarMouseOut
    } = props;
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the return 
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Bars
                data={data}
                xScale={xScale}
                yScale={yScale}
                height={height}
                selectedStation={selectedStation}
                onMouseEnter={onBarMouseEnter}
                onMouseOut={onBarMouseOut}
            />
            <YAxis yScale={yScale} height={height} axisLable={"Bikers star from"}/>
            <XAxis xScale={xScale} height={height} width={width} />
        </g>
    )
}

export default BarChart