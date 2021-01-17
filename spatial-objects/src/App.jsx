import './App.css';
import {useEffect, useState} from 'react'
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';
import randomColor from 'randomcolor';
import {addFeatureCollection} from "./store/actions";
import {v4 as uuid} from "uuid";
import simplify from 'simplify-geometry';
import Map from "./component/map";
import Table from "./component/table";
import TableRow from "./component/table-row";

const store = configureStore();
const filterFeatures = (featuresObj) => {
    let filteredFeatures = {...featuresObj};
    let id = 1;
    filteredFeatures.features = featuresObj.features.reduce((featuresArr, feature) => {
        if (feature.geometry.type === "Polygon") {
            const customFeature = {
                ...feature,
                id: id,
                properties: {
                    ...feature.properties,
                    date: new Date(),
                    comment: '',
                    color: randomColor(),
                    name: "samir's polygon " + id,
                    id: id
                }
            };
            id++;
            featuresArr.push(customFeature)
        }
        return featuresArr;
    }, []);
    return filteredFeatures;
}

function App() {
    const [error, setError] = useState(null);
    const [isAPILoaded, setIsAPILoaded] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const dataURL = 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson';
    useEffect(() => {
        console.clear();
        fetch(dataURL)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    console.log(filterFeatures(result));
                    store.dispatch(addFeatureCollection(filterFeatures(result)))
                    console.log(store.getState())
                    setIsDataLoaded(true);
                },
                (error) => {
                    setError(error);
                }
            );
        if (!window.google) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://maps.googleapis.com/maps/api/js`;
            script.id = 'googleMaps';
            document.body.appendChild(script);
            script.addEventListener('load', e => {
                setIsAPILoaded(true);
            })
        } else {
            setIsAPILoaded(true);
        }
    }, []);
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    Spatial Drawing/Editing Tool
                </header>
                {(!isAPILoaded || !isDataLoaded) && !error && <div className={'loading'}>loading ...</div>}
                {error && <div className={'error'}>Couldn't load data! <br/> {error.message} </div>}
                <div className={'App-body'}>
                    {
                        isAPILoaded && isDataLoaded && !error &&
                        <Map id="myMap" options={{center: {lat: -73.9149981543978, lng: 40.5622585672098}, zoom: 15}}/>
                    }
                    {
                        isAPILoaded && isDataLoaded && !error && <Table/>
                    }
                </div>
            </div>
        </Provider>
    );
}

export default App;
