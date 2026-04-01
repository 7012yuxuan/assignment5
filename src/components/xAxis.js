import React from 'react';
import * as d3 from 'd3';

//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate

function XAxis(props){
    const { xScale, height, width, axisLable } = props;
    const xAxisRef = React.useRef();
    
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    
    React.useEffect(() => {
        if (xScale) {
            let axis;

            if (typeof(xScale.domain()[0]) === "number") {
                // linear scale for scatter plot
                axis = d3.axisBottom(xScale).ticks(10);
            } else {
                // discrete scale for bar chart
                axis = d3.axisBottom(xScale).tickSize(0);
            }

            d3.select(xAxisRef.current).call(axis);

            if (typeof(xScale.domain()[0]) === "string") {
                d3.select(xAxisRef.current)
                    .selectAll("text")
                    .style("text-anchor", "start")
                    .attr("transform", "rotate(77)")
                    .attr("dx", "0.6em")
                    .attr("dy", "0.1em");
            }
        }
    }, [xScale]);
    
    if(xScale) {
        return (
            <g>
                <g ref={xAxisRef} transform={`translate(0, ${height})`} />
                <text
                    style={{ textAnchor: 'end', fontSize: '15px', fill: '#000' }}
                    x={width - 10}
                    y={height - 10}
                >
                    {axisLable}
                </text>
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default XAxis