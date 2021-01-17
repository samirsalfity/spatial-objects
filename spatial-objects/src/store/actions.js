export const addFeatureCollection = newFeatureCollection => ({
    type: 'ADD_FEATURE_COLLECTION',
    newFeatureCollection
});
export const editFeaturePath = (id, updatedFeaturePath) => ({
    type: 'EDIT_FEATURE_PATH',
    id,
    updatedFeaturePath
});
export const editFeatureProperties = (id, updatedFeatureProperties) => ({
    type: 'EDIT_FEATURE_PROPERTY',
    id,
    updatedFeatureProperties,
    date: new Date()
});
export const selectFeature = id => ({
    type: 'SELECT_FEATURE',
    id
});
export const addMap = newMap => ({
    type: 'ADD_MAP',
    newMap
});
export const addMapFeatures = featuresArr => ({
    type: 'ADD_MAP_FEATURES',
    featuresArr
});