import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup, ScaleControl, NavigationControl, FullscreenControl, GeolocateControl} from 'react-map-gl';

import {listLogEntries} from './API';
import LogEntryForm from './LogEntryForm';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaWFtcHJpbWUiLCJhIjoiY2thZzc5MXcwMDNybjJzb3lxZnFqcWIxOSJ9.HKCegM3Kueaf5RxItCZqUQ';

const MAP_STYLE = "mapbox://styles/iamprime/ck75rb08g0iry1ik96iif7jkl";

const fullscreenCtrlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

const geoLocateCtrl = {
  position: 'absolute',
  top: 130,
  left: 0,
  padding: '10px'
}


const App = () => {

  const [logEntries, setLogentries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 5.57205,
    longitude: 7.058823,
    //latitude: 36.553085,
    //longitude: 103.97543,
    zoom: 3,
    maxZoom: 20
  });

  

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogentries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude, 
      longitude,
    });
  }


  return (
    <ReactMapGL 
      {...viewport}
      mapStyle={MAP_STYLE}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onClick={showAddMarkerPopup}
    >
      { 
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
          <Marker 
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            offsetLeft={-15} 
            offsetTop={-30}
          >
            
            <div
              onClick={() => setShowPopup({
                [entry._id]: true,
              })}
            >
              {/**<img 
                  className="marker" 
                  style={{
                    width: `${6 * viewport.zoom}px`,
                    height: `${6 * viewport.zoom}px`,
                  }}
                  src=""
                  alt="Map marker"
                />*/
              }

              <svg 
              viewBox="0 0 24 24" 
              width="30px" 
              height="30px"  
              stroke="darkmagenta" 
              strokeWidth="2" 
              fill="gold"  
              strokeLinecap="round"   
              strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9  13s-9-6-9-13a9 9 0 0 1 18 0z"></ path><circle cx="12" cy="10" r="3"></  circle>
              </svg>
            </div>
        </Marker>
        {
          showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              dynamicPosition={true}
              sortByDepth={true}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({
              })}
              anchor="top" >
              <div className="popup">
                <h3>{entry.title}</h3>
                {entry.image ? <img src={entry.image} alt={entry.title}/> : null}
                <p>{entry.description}</p>
                <p>{entry.comments}</p>
                <small>Experience Rating: {entry.rating} <br/>
                Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
              </div>
            </Popup>
          ) : null
        }
        <div style={fullscreenCtrlStyle}>
          <FullscreenControl/>
        </div>
        <div style={navStyle}>
          <NavigationControl/>
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl/>
        </div>
        <div style={geoLocateCtrl}>
          <GeolocateControl
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
            showUserLocation={true}
          />
        </div>
      </React.Fragment>
        ))
      }

      {/** Add New Travella Information */}
      {
        addEntryLocation ? (
          <>
            <Marker 
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude} 
              //offsetLeft={-15} 
              //offsetTop={-30}
            >
            
              <div>
                <svg 
                viewBox="0 0 24 24" 
                width="30px" 
                height="30px"  
                stroke="midnightblue" 
                strokeWidth="2" 
                fill="goldenrod"  
                strokeLinecap="round"    
                strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9    13s-9-6-9-13a9 9 0 0 1 18 0z"></  path><circle cx="12" cy="10"   r="3"></  circle>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              dynamicPosition={true}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className="popup">
                <LogEntryForm 
                  onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation} 
                />
              </div>
          </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}


export default App;
