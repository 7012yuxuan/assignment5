import React from 'react';
import * as d3 from 'd3';

function YAxis(props){
    const { yScale, height, axisLable } = props;
    const yAxisRef = React.useRef();

    React.useEffect(() => {
        if (yScale) {
            const axis = d3.axisLeft(yScale);
            d3.select(yAxisRef.current).call(axis);
        }
    }, [yScale]);

    if(yScale){
        return (
            <g>
                <g ref={yAxisRef} />
                <text
                    style={{ textAnchor:'middle', fontSize:'15px', fill:'#000' }}
                    transform={`translate(20, 65) rotate(-90)`}
                >
                    {axisLable}
                </text>
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default YAxis