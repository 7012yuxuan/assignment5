
import React from 'react';

function getColor(selectedStation, station) {
    if (station === selectedStation) {
        return 'red';
    }

    return 'steelblue';
}

function getRadius(selectedStation, station) {
    if (station === selectedStation) {
        return 10;
    }

    return 5;
}

function Points(props) {
    const {data, xScale, yScale, height, width, selectedStation, onMouseEnter, onMouseMove, onMouseOut} = props;

    const selectedPoint = selectedStation
        ? data.find((d) => d.station === selectedStation)
        : null;

    //Note: 
    //the if(data){...} means when data is not null, the component will return the points; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return <g>
        {data.map((d, i) => (
            <circle
                key={i}
                cx={xScale(d.tripdurationS)}
                cy={yScale(d.tripdurationE)}
                r={getRadius(selectedStation, d.station)}
                fill={getColor(selectedStation, d.station)}
                stroke="black"
                strokeWidth="1"
                onMouseEnter={(event) => onMouseEnter(d.station, event, d)}
                onMouseMove={onMouseMove}
                onMouseOut={onMouseOut}
            />
        ))}
        {selectedStation ? (
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill="yellow"
                opacity={0.4}
                pointerEvents="none"
            />
        ) : null}
        {selectedPoint ? (
            <circle
                cx={xScale(selectedPoint.tripdurationS)}
                cy={yScale(selectedPoint.tripdurationE)}
                r={10}
                fill="red"
                stroke="black"
                strokeWidth="1"
                pointerEvents="none"
            />
        ) : null}
        </g>
    } else {
        return <g></g>
    }
}

export default Points