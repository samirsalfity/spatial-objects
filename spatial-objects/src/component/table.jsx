import '../style/via-table.scss'
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import TableRow from "./table-row";
import {selectFeature} from "../store/actions";

const getPolygonsToDisplay = (polygons, tablePage) => {
    let polygonsToDisplay = [];
    for (let i = 10 * tablePage; (i < 10 * tablePage + 10) && i < polygons.length; i++) {
        polygonsToDisplay.push(polygons[i]);
    }
    return polygonsToDisplay;
};
const Table = (props) => {

    const [numberOfPages, setNumberOfPages] = useState(Math.ceil((props.polygons.length - 1) / 10));
    const [polygonsToDisplay, setPolygonsToDisplay] = useState(getPolygonsToDisplay(props.polygons, props.tablePage));

    useEffect(() => {

        setNumberOfPages(Math.ceil((props.polygons.length - 1) / 10));
        setPolygonsToDisplay(getPolygonsToDisplay(props.polygons, props.tablePage));
    }, [props.polygons, props.tablePage])
    return (<div className={"via-table-container"}>
        {polygonsToDisplay.length > 0
        && <div className={"via-table"}>
            <div className={'table-header'}>
                <div className={'table-row'}>
                    <div>Name</div>
                    <div>Color</div>
                    <div>Comment</div>
                    <div>Creation Date</div>
                </div>
            </div>
            <div className={'table-body'}>
                {
                    polygonsToDisplay.map(polygon => <TableRow key={polygon.id} polygonData={{
                        ...polygon.properties,
                        id: polygon.id
                    }}/>)
                }
            </div>
            <div className={'table-page'}>
                <select value={props.tablePage}
                        onChange={e => props.dispatch(selectFeature(e.target.selectedIndex * 10 + 1))}>
                    {(() => {
                        let options = [];
                        for (let i = 0; i < numberOfPages; i++) {
                            options.push(<option key={i} value={i}>{i}</option>);
                        }
                        return options;
                    })()}

                </select>
            </div>
        </div>}
    </div>)
}
const mapStateToProps = (state) => (
    {
        polygons: state.featureCollection.features || [],
        tablePage: Math.floor((state.selectedFeatureId - 1) / 10)
    }
);
export default connect(mapStateToProps)(Table);