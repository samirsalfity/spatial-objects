const polygonsReducerDefaultState = {
    featureCollection: {},
    selectedFeatureId: 1,
    mapFeatures: []
};
export default (state = polygonsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_FEATURE_COLLECTION':
            return {
                ...state,
                featureCollection: action.newFeatureCollection
            }
        case 'LAST_EDITED_FEATURE':
            return {
                ...state,
                lastEditedFeatureId: action.id
            }
        case 'SELECT_FEATURE':
            return {
                ...state,
                selectedFeatureId: action.id
            }
        case 'ADD_MAP':
            return {
                ...state,
                map: action.newMap
            }
        case 'ADD_MAP_FEATURES':
            return {
                ...state,
                mapFeatures: action.featuresArr
            }
        case 'EDIT_FEATURE_PATH':
            return {
                ...state,
                featureCollection: {
                    ...state.featureCollection,
                    features: state.featureCollection.features.map(feature => {
                        if (feature.properties.id === action.id) {
                            return {
                                ...feature,
                                geometry: {
                                    ...feature.geometry,
                                    coordinates: [action.updatedFeaturePath]
                                }
                            }
                        } else {
                            return feature;
                        }
                    })
                }
            }
        case 'EDIT_FEATURE_PROPERTY':
            return {
                ...state,
                featureCollection: {
                    ...state.featureCollection,
                    features: state.featureCollection.features.map(feature => {
                        if (feature.properties.id === action.id) {
                            return {
                                ...feature,
                                properties: {
                                    ...feature.properties,
                                    ...action.updatedFeatureProperties,
                                    data: action.date
                                }
                            }
                        } else {
                            return feature;
                        }
                    })
                }
            }
        default:
            return state;
    }
}