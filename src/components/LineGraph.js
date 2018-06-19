/* global Plotly:true */
import React, { Component } from 'react';
import $ from 'jquery';

class LineGraph extends Component {

  componentDidMount(){
    const { title, daily, trend, color } = this.props

      var d3 = Plotly.d3;

      var WIDTH_IN_PERCENT_OF_PARENT = 60,
          HEIGHT_IN_PERCENT_OF_PARENT = 80;

      var gd3 = d3.select('#plot')
      var gd = gd3.node();

      Plotly.plot(gd, [
                {
                    name: 'Values',
                    type: 'scatter',
                    x: daily.timeline,
                    y: daily.values,
                    marker: { color: 'red' }
                },
                {
                    name: 'Trend',
                    type: 'scatter',
                    mode: 'lines',
                    x: trend.timeline,
                    y: trend.values,
                    marker: {color: 'blue'}
                }
              ], {
          title: `<b class="graphTitle">${title}</b>`,

      }, { modeBarButtonsToRemove:['Pan'], displaylogo: false });

        window.onresize = () => {
          Plotly.Plots.resize(gd);
        };
  }

    render() {
        const { title, daily, trend } = this.props
          return (
            <div id="plot" style={{display:'flex', minWidth:'0', flexGrow:'1', height:'300px', alignItems: 'center '}}></div>
          );
    }
}

export default LineGraph;
