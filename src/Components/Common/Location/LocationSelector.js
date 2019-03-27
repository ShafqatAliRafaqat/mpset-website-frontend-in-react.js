import React, {Component} from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';

class LocationSelector extends Component {

  state = {
    location:null
  };

  componentDidMount() {

    const {centerAroundCurrentLocation,onLocationChange} = this.props;

    if (centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          let location = {
            lat: coords.latitude,
            lng: coords.longitude
          };
          this.setState({
            location
          });
          onLocationChange(location);
        })
      }
    }else{
      this.setState({
        location:this.props.location
      });
    }
  }

  onDrag = (mapProps, map) => {
    let l = map.getCenter();
    this.props.onLocationChange({
      lat:l.lat(),
      lng:l.lng(),
    });
  };

  centerChanged = (mapProps, map) =>{
    const maps = mapProps.google.maps;
    let l = map.getCenter();
    let center = new maps.LatLng(l.lat(), l.lng());
    this.marker.setPosition(center);
  };

  onReady = (mapProps, map) => {
    const google = mapProps.google;
    this.addMarker(mapProps,map);
    google.maps.event.addListener(map,'center_changed',()=>this.centerChanged(mapProps,map));
  };

  addMarker = (mapProps, map) => {
    const maps = mapProps.google.maps;
    this.marker = new maps.Marker({
      position: this.state.location,
      map
    });
  };

  render(){

    let {location} = this.state;
    let {style} = this.props;

    if(location == null){
      return <p>Loading...</p>;
    }

    return (
      <Map style={style} google={this.props.google} onReady={this.onReady} zoom={16} initialCenter={location} onDragend={this.onDrag}/>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBv_Pb3XYIUpJ9J7L6hmXhHQ8DaqoMN2UI"
})(LocationSelector)
