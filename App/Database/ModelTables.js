const TR_LOGIN = {
    name:'TR_LOGIN',
    primaryKey: 'USER_AUTH_CODE',
    properties: {
        NIK: 'string',
        ACCESS_TOKEN: 'string',
        JOB_CODE: 'string', 
        LOCATION_CODE: 'string',
        REFFERENCE_ROLE: 'string',
        USERNAME: 'string', 
        USER_AUTH_CODE: 'string',
        USER_ROLE: 'string', 
    }
}

const TR_BLOCK_INSPECTION_H = {
    name:'TR_BLOCK_INSPECTION_H',
    primaryKey: 'BLOCK_INSPECTION_CODE',
    properties: {
        BLOCK_INSPECTION_CODE: 'string',
        WERKS:'string',
        AFD_CODE:'string',
        BLOCK_CODE:'string',
        INSPECTION_DATE:'string',
        INSPECTION_SCORE:'string',
        INSPECTION_RESULT:'string',
        STATUS_SYNC:'string',
        SYNC_TIME:'string',
        START_INSPECTION:'string',
        END_INSPECTION:'string',
        LAT_START_INSPECTION:'string',
        LONG_START_INSPECTION:'string',
        LAT_END_INSPECTION:'string',
        LONG_END_INSPECTION:'string',
        ASSIGN_TO:'string'
    }
}

const TR_BLOCK_INSPECTION_D = {
    name: 'TR_BLOCK_INSPECTION_D',
    primaryKey: 'BLOCK_INSPECTION_CODE_D',
    properties:{
        BLOCK_INSPECTION_CODE_D: 'string',
        BLOCK_INSPECTION_CODE: 'string',
        CONTENT_INSPECTION_CODE:'string',
        AREAL: 'string',
        VALUE: 'string', 
        STATUS_SYNC: 'string'
    }
}

const TR_IMAGE = {
    name: 'TR_IMAGE',
    primaryKey: 'IMAGE_CODE',
    properties:{
        IMAGE_CODE: 'string',
        TR_CODE: 'string',
        IMAGE_NAME:'string',
        IMAGE_PATH: 'string',
        STATUS_IMAGE: 'string', 
        STATUS_SYNC: 'string'
    }
}

const TR_TRACK_INSPECTION = {
    name: 'TR_TRACK_INSPECTION',
    primaryKey: 'TRACK_INSPECTION_CODE',
    properties:{
        TRACK_INSPECTION_CODE: 'string',
        BLOCK_INSPECTION_CODE: 'string',
        DATE_TRACK:'string',
        LAT_TRACK: 'string',
        LONG_TRACK: 'string' 
    }
}

const TR_BARIS_INSPECTION = {
    name: 'TR_BARIS_INSPECTION',
    primaryKey: 'ID',
    properties:{
        ID: 'int',
        BLOCK_INSPECTION_CODE : 'string'        
    }
}

const TM_AFD = {
    name: 'TM_AFD',
    // primaryKey: 'ID',
    properties:{
        REGION_CODE: 'int',
        COMP_CODE : 'int' ,    
        EST_CODE : 'int' ,    
        WERKS : 'int' , 
        AFD_CODE:'string',
        AFD_NAME:'string',  
        WERKS_AFD_CODE : 'string' , 
        START_VALID : 'string' , 
        END_VALID : 'string' , 
        INSERT_TIME_DW : 'string' , 
        UPDATE_TIME_DW : 'string' , 
        INSERT_USER : 'string' , 
        INSERT_TIME : 'string' , 
        UPDATE_USER : 'string' , 
        UPDATE_TIME : 'string' , 
        FLAG_UPDATE : 'string' , 
    }
}


export default {TR_LOGIN, TR_BLOCK_INSPECTION_H, TR_BLOCK_INSPECTION_D, TR_IMAGE, TR_TRACK_INSPECTION, TR_BARIS_INSPECTION, TM_AFD}