import React, { Component } from 'react';
import { GoogleMap, Polygon, InfoWindow } from "react-google-maps"
//import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { calculateRGB, mergeLayOutGraphPoints } from '../actions';

class GoogleMaps extends Component{
  constructor(props){
    super(props)
    this.state = { map: '', activeInfoWindow: null }
  }

  componentDidMount(){
    const { styles } = this.props;
    let map = new window.google.maps.Map(document.getElementById('map'), {
                        center: { lat: 40.7298234945997, lng: -73.9375262238936 },
                        zoom: 11,
                        styles
                      });
    this.setState({map});
    this.appendPolygons(map)
    
  }

  appendPolygons(map){
    
    const { maps } = window.google;
    maps.Polygon.prototype.my_getBounds=function(){
      var bounds = new maps.LatLngBounds()
      this.getPath().forEach(function(element,index){bounds.extend(element)})
      return bounds
    }

   
    let mergedPoints = mergeLayOutGraphPoints(this.props.mapLayOut, this.props.graphPoints);

    let polyShapes = [];

      mergedPoints.forEach((cc)=>{
        const { layout, graph } = cc;
        let fillColor = calculateRGB()[0];
        let shape = new maps.Polygon({
            paths: layout.points,
            fillColor, 
            fillOpacity: 0.45
      })
        polyShapes.push(shape)

      let coords = shape.my_getBounds().getCenter()
      let position = {lat: coords.lat(), lng: coords.lng()}

      const { as_of_dt, current_fytd, previous_fytd } = graph 
      let percentChange = ((current_fytd/previous_fytd) - 1) * 100;
      let percentChangeYtd = Math.round(percentChange * 100) / 100;
      let content = `<div style='display:flex; flex-direction: row'>
                        <div style='display:flex; padding-right:10px;flex-direction: column'>
                          <p style='margin:0; padding:0;padding-right:3px'>Previous</p>
                          <div style='border-right:double; text-align: center;'>
                             ${previous_fytd}
                          </div>
                        </div>
                        <div style='display:flex; padding-right:10px; flex-direction: column'>
                          <p style='margin:0; padding:0;padding-right:3px'>Current</p>
                          <div style='border-right:double; padding-right:1px;text-align: center;'>
                            ${current_fytd}
                          </div>
                        </div>
                        <div style='display:flex; padding-right:10px; flex-direction: column'>
                          <p style='margin:0; madding:0;padding-right:3px'>Change</p>
                          <div style='text-align:center;'>
                            <b>${percentChangeYtd > 0 ? `+${percentChangeYtd}` : percentChangeYtd}%</b>
                          </div>
                        </div>
                    </div>`
      let infoWindow = new maps.InfoWindow({ content, position });

        maps.event.addListener(infoWindow,'closeclick',function(){
            polyShapes.forEach(shape => shape.setOptions({strokeColor:'black', strokeWeight: 3.0}))
         });
 
        shape.setMap(map)
        shape.addListener('click', (e)=> {
        console.log('clicked', e)
        
        if(this.state.activeInfoWindow) {
            this.state.activeInfoWindow.close();
          }
          this.setState({activeInfoWindow: infoWindow});
          this.state.activeInfoWindow.open(this.state.map);
          shape.setOptions({strokeColor:'white', strokeWeight: 5.0});
          console.log('active window after click',this.state.activeInfoWindow)
      });

      maps.event.trigger(this.state.map, 'ready')
      
    })


  }

  render(){
    return(
      <div id="map" style={{ height: `400px`, display:'flex', flexGrow:'1'}}/>
      )
  }
}

export default GoogleMaps;
