import '../style/map.scss';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {selectFeature} from "../store/actions";

function processPoints(geometry, callback, thisArg) {
    if (geometry instanceof window.google.maps.LatLng) {
        callback.call(thisArg, geometry);
    } else if (geometry instanceof window.google.maps.Data.Point) {
        callback.call(thisArg, geometry.get());
    } else {
        geometry.getArray().forEach((g) => {
            processPoints(g, callback, thisArg);
        });
    }
}

const getPolygonCoords = (coordinates) => {
    const polygonCoordinates = coordinates.map(coordinate => {
        return {lng: coordinate[0], lat: coordinate[1]};
    });
    return polygonCoordinates;
};

const Map = (props) => {
    const [map, setMap] = useState(null);
    useEffect(() => {
        if (map) {
            props.featureCollection.features.forEach(editedFeature=>{
                map.data.forEach(currentMapFeature => {
                    if (currentMapFeature.getProperty("id") === editedFeature.id) {
                        for (const [key, value] of Object.entries(editedFeature.properties)) {
                            currentMapFeature.setProperty(key, value);
                        }
                    }
                });
            })
        }
    }, [props.featureCollection]);
    useEffect(() => {
        if (map) {
            map.data.forEach((feature) => {
                const featureId = feature.getProperty("id");
                if (featureId === props.selectedFeatureId) {
                    const bounds = new window.google.maps.LatLngBounds();
                    processPoints(feature.getGeometry(), bounds.extend, bounds);
                    map.fitBounds(bounds);
                    feature.setProperty('hovered', true);
                    // const infoWindow = new window.google.maps.InfoWindow();
                    // const contentString = `name: ${feature.getProperty('name')}` +
                    //     `comment: ${feature.getProperty('comment')}`
                    //     + `creation-date: ${feature.getProperty('date')}`
                    //     + `polygon-color: ${feature.getProperty('color')}`
                    // infoWindow.setContent(contentString);
                    // // infoWindow.setPosition(bounds);
                    // infoWindow.open(map);
                } else {
                    feature.removeProperty('hovered');
                }
            });
        }
    }, [props.selectedFeatureId]);
    useEffect(() => {
        const map = new window.google.maps.Map(document.getElementById(props.id), props.options);
        try {
            map.data.addGeoJson(props.featureCollection);
            const bounds = new window.google.maps.LatLngBounds();
            map.data.forEach((feature) => {
                processPoints(feature.getGeometry(), bounds.extend, bounds);
            });
            map.fitBounds(bounds);
            map.data.setStyle((feature) => {
                return /** @type {google.maps.Data.StyleOptions} */ {
                    fillColor: feature.getProperty('hovered') === true ? 'red' : feature.getProperty("color"),
                    // fillColor: feature.getProperty("color"),
                    fillOpacity: 1,
                    strokeOpacity: 1,
                    strokeWeight: feature.getProperty('hovered') === true ? 6 : 1,
                    editable: feature.getProperty('hovered') === true ? true : false
                    // editable: false
                };
            });
            map.data.addListener('mouseover', function (event) {
                props.dispatch(selectFeature(event.feature.getProperty('id')));
            });
        } catch (e) {
            alert("Not a GeoJSON !");
        }
        setMap(map);
    }, []);
    return (
        <>
            <div style={{width: 600, height: 600}} id={props.id}></div>
            {/*<div id="info-box">?</div>*/}
        </>
    );
}
const mapStateToProps = (state) => ({
    featureCollection: state.featureCollection,
    selectedFeatureId: state.selectedFeatureId,
    lastEditedFeatureId: state.lastEditedFeatureId
});
export default connect(mapStateToProps)(Map);