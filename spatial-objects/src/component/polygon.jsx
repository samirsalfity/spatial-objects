import {useEffect} from 'react';

const Polygon = (props) => {
    const getPolygonCoords = (coordinates) => {
        const polygonCoordinates = coordinates.map(coordinate => {
            return {lng: coordinate[0], lat: coordinate[1]};
        });
        return polygonCoordinates;
    };
    useEffect(() => {
        const polygonCoordinates = getPolygonCoords(props.data.geometry.coordinates[0]);
        props.map.data.add({
            geometry: new window.google.maps.Data.Polygon([
                polygonCoordinates
            ]),
        });
        // const testPolygon = new window.google.maps.Polygon({
        //     paths: polygonCoordinates,
        //     strokeColor: "#FF0000",
        //     strokeOpacity: 0.8,
        //     strokeWeight: 2,
        //     fillColor: "#FF0000",
        //     fillOpacity: 0.35,
        //     editable:true
        // });
        // testPolygon.setMap(props.map);
    }, [props]);
    return <></>;
};
export default Polygon;

// map.data.addListener('click', function (event) {
//     // event.feature.setProperty('isHidden', true);
//     // const selectedId = event.feature.getProperty('id');
//     // const selectedFeature = props.featureCollection.features.find(feature => feature.properties.id === selectedId);
//     // map.data.remove(event.feature);
//     // oldFeature=selectedFeature;
//     // map.data.add(oldFeature);
//     // props.dispatch(editFeatureProperties(selectedId, {isHidden: true}));
//
//     // const selectedPolygonCoordinates = getPolygonCoords(selectedFeature.geometry.coordinates[0]);
//     // const selectedPolygon = new window.google.maps.Polygon({
//     //     paths: selectedPolygonCoordinates,
//     //     strokeColor: "#FF0000",
//     //     strokeOpacity: 0.8,
//     //     strokeWeight: 2,
//     //     fillColor: "#FF0000",
//     //     fillOpacity: 0.35,
//     //     zIndex:99,
//     //     editable:true
//     // });
//     // const infoWindow = new window.google.maps.InfoWindow();
//     //
//     // selectedPolygon.setMap(map);
//     // selectedPolygon.addListener("click", showArrays);
//     // function showArrays(event) {
//     //     // Since this polygon has only one path, we can call getPath() to return the
//     //     // MVCArray of LatLngs.
//     //     const polygon = this;
//     //     const vertices = polygon.getPath();
//     //     console.log(polygon.getPath())
//     //     let contentString =
//     //         "<b>Bermuda Triangle polygon</b><br>" +
//     //         "Clicked location: <br>" +
//     //         event.latLng.lat() +
//     //         "," +
//     //         event.latLng.lng() +
//     //         "<br>";
//     //
//     //     // Iterate over the vertices.
//     //     for (let i = 0; i < vertices.getLength(); i++) {
//     //         const xy = vertices.getAt(i);
//     //         contentString +=
//     //             "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
//     //     }
//     //     // Replace the info window's content and position.
//     //     infoWindow.setContent(contentString);
//     //     infoWindow.setPosition(event.latLng);
//     //     infoWindow.open(map);
//     // }
// });