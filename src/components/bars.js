import React from 'react';

function getColor(selectedStation, station) {
    if (station === selectedStation) {
        return 'red';
    }

    return 'steelblue';
}

function Bars(props) {
    const {data, xScale, yScale, height, selectedStation, onMouseEnter, onMouseOut} = props;

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return (
            <g>
                {data.map((d, i) => (
                    <rect
                        key={i}
                        x={xScale(d.station)}
                        y={yScale(d.start)}
                        width={xScale.bandwidth()}
                        height={height - yScale(d.start)}
                        fill={getColor(selectedStation, d.station)}
                        stroke="black"
                        onMouseEnter={() => onMouseEnter(d.station)}
                        onMouseOut={onMouseOut}
                    />
                ))}
            </g>
        )
    } else {
        return <g></g>
    }
}

export default Bars