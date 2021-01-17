// import {editPolygon, hoverPolygon} from "../store/actions";
import {useState} from 'react';
import {connect} from 'react-redux';
import {selectFeature, editFeatureProperties} from "../store/actions";

const TableRow = (props) => {
    const handleInputChange = (e) => {
        props.dispatch(editFeatureProperties(props.polygonData.id, {[e.target.name]: e.target.value}));
    };
    const mouseOverRow = (e) => {
        props.dispatch(selectFeature(props.polygonData.id));
    };
    const mouseOutRow = (e) => {
    };
    // const [hoveredRowId, setHoveredRowId] = useState(props.selectedFeatureId);
    // const [rowId, setRowId] = useState(props.polygonData.id);
    // const [hoverClass, setHoverClass] = useState(rowId === hoveredRowId ? 'hover' : '');
    return (
        <div key={props.polygonData.id} className={'table-row' + ' ' + props.hoverClass} onMouseOver={mouseOverRow}
             onMouseOut={mouseOutRow}>
            <div><input type={'text'} name={'name'} value={props.polygonData.name} onChange={handleInputChange}/>
            </div>
            <div><input type={'text'} name={'color'} value={props.polygonData.color}
                        onChange={handleInputChange}/></div>
            <div><textarea type={'text'} name={'comment'} value={props.polygonData.comment}
                           onChange={handleInputChange}/></div>
            <div><input disabled={true} type={'text'} name={'date'} value={props.polygonData.date}
                        onChange={handleInputChange}/></div>
        </div>
    );
};
const mapStateToProps = (state, props) => (
    {
        hoverClass: props.polygonData.id === state.selectedFeatureId ? 'hover' : ''
    }
);
export default connect(mapStateToProps)(TableRow);