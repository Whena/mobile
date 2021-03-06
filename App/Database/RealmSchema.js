import Realm from 'realm';
import ModelTables from './ModelTables';

// Initialize a Realm with models
// var defaultPath = Realm.defaultPath;
// var newPath     = defaultPath.substring(0, defaultPath.lastIndexOf('/')) + '/default.realm';
let realmSchema = new Realm({
    // path: newPath,
    schema: [
        ModelTables.TR_LOGIN,
        ModelTables.TR_BLOCK_INSPECTION_H,
        ModelTables.TR_BLOCK_INSPECTION_D,
        ModelTables.TR_BARIS_INSPECTION,
        ModelTables.TR_IMAGE,
        ModelTables.TM_AFD,
        ModelTables.TR_CATEGORY,
        ModelTables.TR_CONTACT,
        ModelTables.TR_FINDING,
        ModelTables.TM_REGION,
        ModelTables.TM_BLOCK,
        ModelTables.TM_EST,
        ModelTables.TM_LAND_USE,
        ModelTables.TM_COMP,
        ModelTables.TM_CONTENT,
        ModelTables.TM_CONTENT_LABEL,
        ModelTables.TM_KRITERIA,
        ModelTables.TM_INSPECTION_TRACK,
        ModelTables.TM_TIME_TRACK
    ]
});

// let realmSchemaTrack = new Realm({

// })
export default realmSchema;