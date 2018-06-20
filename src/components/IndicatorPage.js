/* global Plotly:true */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import trend from 'trend';
import $ from 'jquery';
import axios from 'axios';
import { DEFAULT_HEADERS, getDispatcher, FETCH_DATA, loadData } from '../actions';
import LineGraph from './LineGraph';
import GoogleMaps from './GoogleMaps';
import { Grid, Cell } from 'react-mdl';
import nightStyle from '../geoJson/nightStyle';
import '../css/IndicatorPage.css';
import { determineMapLayout, determineMapType, cachDetail, titles, numberWithCommas, roundNumber, hideOrShowSlider } from '../actions';

class IndicatorPage extends Component {

  constructor(props){
    super(props);
    this.state = { dataSetName: '', graphPoints: [], plotPoints: [], timeline: [], values: [], plottable: true }
  }

  // componentWillMount(){
  //   const { indicatorPage } = this.props.match.params
  //
  //   let cardDetails = this.props.cachedCardDetail.filter((card) => card.datasetName == indicatorPage);
  //   if(cardDetails.length > 0){
  //     let cardDetail = cardDetails[0].data.data;
  //     this.saveState(cardDetail, indicatorPage)
  //   }else{
  //      axios.get(`http://localhost:5555/api/${indicatorPage}` ,{ method: 'GET', headers: DEFAULT_HEADERS })
  //       .then((jsonResponse) => {
  //         console.log('RESPONSE POINTS:', jsonResponse)
  //         let plotablePoints = jsonResponse.data.cw
  //         //debugger;
  //         this.props.cachDetail({datasetName: indicatorPage, data: jsonResponse })
  //         this.saveState(jsonResponse.data, indicatorPage)
  //       })
  //       console.log('STORED POINTS:', this.props.raw_cards)
  //   }
  //
  // }

  componentWillMount(){
    const { indicatorPage } = this.props.match.params
    getDispatcher('GET', 'api', FETCH_DATA)
    let cardDetails = this.props.cachedCardDetail.filter((card) => card.datasetName == indicatorPage);
    if(cardDetails.length > 0){
      let cardDetail = cardDetails[0].data.data;
      this.saveState(cardDetail, indicatorPage)
    }else{
       let data = loadData('GET', 'api', indicatorPage)
       let plotablePoints = data
       this.props.cachDetail({datasetName: indicatorPage, data: data })
       this.saveState(plotablePoints, indicatorPage)
        console.log('STORED POINTS:', this.props.raw_cards)
    }

  }


  saveState(cardDetail, indicatorPage){
      let plotablePoints = cardDetail
      debugger;
      if (plotablePoints.length == 0) { this.setState({ dataSetName: indicatorPage, plottable: false }) }
      this.setState({graphPoints: cardDetail});
      this.renderDataPoints(plotablePoints)
  }


 componentDidMount(){
      $('div').unbind('scroll');
      $('.mdl-layout__header').show()
      hideOrShowSlider(window);
 }

  renderDataPoints(plotPoints){
    let values = plotPoints.map(dataPoint => dataPoint.current_val)
    let timeline = plotPoints.map(dataPoint => dataPoint.as_of_dt)
    this.setState({plotPoints, timeline, values })
  }

  renderMap(){
    const { graphPoints } = this.state;
    if (graphPoints.length > 0){
        let mapType = determineMapType(graphPoints);
        if( (!!mapType)){
            return (<GoogleMaps
                      isMarkerShown
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKlQ6I-LhNd371OBwgIH3yQtrpYu2oxA8&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `400px`, display:'flex', flexGrow:'1'}} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      styles={nightStyle}
                      mapLayOut={determineMapLayout(mapType)}
                      graphPoints={graphPoints}
                      />)
        }else{
          <div></div>
        }

            }
  }

  renderSparkGraph(datasetName){
   const { plotPoints, values, timeline, plottable } = this.state;
   if(!plottable) { return <div style={{paddingTop: '30px'}}> <h2 style={{color: 'white'}}> No Plottable Data Points </h2> </div> }
   if(plotPoints.length > 0 ){
      return (
            <LineGraph
                daily={
                  {
                    values,
                    timeline
                  }
                }
                trend={
                  {
                    values: trend(this.state.values),
                    timeline
                  }
                }
                title= {titles(datasetName)} />
      );
    }else{
      return ( <div><img src={'https://loading.io/spinners/cube/lg.pulsing-squares-loader.gif'}/></div>)
    }
  }

    render() {
      console.log('INDICATOR PAGE RENDERED')
      const { data } = this.props.location.state
      const { as_of_dt, current_fytd, previous_fytd, data_set_name, color } = data
      let percentChange = ((current_fytd/previous_fytd) - 1) * 100;
      let percentChangeYtd = numberWithCommas(Math.round(percentChange * 100) / 100);
      return(
        <Grid id="indicator-grid" style={{ justifyContent: 'center'}}>

          <Cell col={2} style={{display:'flex', margin: '0 auto', paddingBottom:'10px', width:'100%', alignItems:'center', justifyContent:'center'}}>
            <div id="cell_child!" style={{display: 'flex', flexGrow:'1', justifyContent: 'space-between', alignItems: 'center', backgroundColor: color, maxHeight:'50px', borderBottom:'solid 5px'}}>
                  <div style={{display: 'flex', justifyContent: 'center', flexDirection:'column', alignItems:'center', maxHeight:'50px', paddingLeft:'5px'}}>
                     <p id="graph-mes" style={{color:'black', fontSize: '15px', marginBottom:'0'}}>Last Updated</p>
                      <p id="graph-mes" style={{color:'black', fontSize: '15px', marginBottom:'0'}}><b>{ as_of_dt }</b></p>
                  </div>

                  <div style={{display: 'inline-flex', justifyContent: 'center', flexDirection:'column', alignItems:'center'}}>
                    <p id="graph-mes" style={{color:'black', fontSize: '15px', marginBottom:'0'}}>Percent Change</p>
                    <p id="graph-mes" style={{color:'black', fontSize: '15px', marginBottom:'0'}}><b>{percentChangeYtd > 0 ? `+${percentChangeYtd}` : percentChangeYtd}%</b></p>
                  </div>


                  <div style={{display: 'inline-flex', justifyContent: 'center', flexDirection:'column', alignItems:'center'}}>
                    <p id="graph-mes" style={{color:'black', fontSize: '15px', marginBottom:'0'}}>Current FYTD</p>
                    <p id="graph-mes" style={{color:'black', fontSize: '15px', marginBottom:'0'}}><b>{ numberWithCommas(roundNumber(current_fytd,2)) }</b></p>
                  </div>
                  <div style={{display: 'inline-flex', justifyContent: 'center', flexDirection:'column', alignItems:'center'}}>
                      <p id="graph-mes" style={{color:'black', fontSize: '15px', marginBottom:'0', paddingRight:'5px'}}>Previous FYTD</p>
                      <p id="graph-mes" style={{color:'black', fontSize: '15px', marginBottom:'0'}}><b>{ numberWithCommas(roundNumber(previous_fytd,2)) }</b></p>
                   </div>
              </div>
          </Cell>

          <Cell col={2} style={{display:'flex', flexGrow:'1', margin: '0 auto', paddingBottom:'10px', width:'100%', alignItems:'center', justifyContent:'center'}}>
              {this.renderMap()}
          </Cell>

          <Cell col={2} style={{display:'flex', flexGrow:'1', margin: '0 auto', paddingBottom:'10px', width:'100%', alignItems:'center', justifyContent:'center', maxHeight:'300px'}}>
            { this.renderSparkGraph(data_set_name) }
          </Cell>

        </Grid>
      )
    }
}

const  mapStateToProps = state => {
  const { raw_cards, searchedCards, groupedCards, cachedCardDetail } = state.cards;
  return { raw_cards, searchedCards, groupedCards, cachedCardDetail }
}
export default connect(mapStateToProps, { cachDetail })(IndicatorPage);
