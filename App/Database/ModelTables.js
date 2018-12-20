const TR_LOGIN = {
    name: 'TR_LOGIN',
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
    name: 'TR_BLOCK_INSPECTION_H',
    primaryKey: 'BLOCK_INSPECTION_CODE',
    properties: {
        BLOCK_INSPECTION_CODE: 'string',
        WERKS: 'string',
        AFD_CODE: 'string',
        BLOCK_CODE: 'string',
        INSPECTION_DATE: 'string',
        INSPECTION_SCORE: 'string',
        INSPECTION_RESULT: 'string',
        STATUS_SYNC: 'string',
        SYNC_TIME: 'string',
        START_INSPECTION: 'string',
        END_INSPECTION: 'string',
        LAT_START_INSPECTION: 'string',
        LONG_START_INSPECTION: 'string',
        LAT_END_INSPECTION: 'string',
        LONG_END_INSPECTION: 'string',
        ASSIGN_TO: 'string'
    }
}

const TR_BLOCK_INSPECTION_D = {
    name: 'TR_BLOCK_INSPECTION_D',
    primaryKey: 'BLOCK_INSPECTION_CODE_D',
    properties: {
        BLOCK_INSPECTION_CODE_D: 'string',
        BLOCK_INSPECTION_CODE: 'string',
        CONTENT_INSPECTION_CODE: 'string',
        AREAL: 'string',
        VALUE: 'string',
        STATUS_SYNC: 'string'
    }
}

const TR_IMAGE = {
    name: 'TR_IMAGE',
    primaryKey: 'IMAGE_CODE',
    properties: {
        IMAGE_CODE: 'string',
        TR_CODE: 'string',
        IMAGE_NAME: 'string',
        IMAGE_PATH: 'string',
        STATUS_IMAGE: 'string',
        STATUS_SYNC: 'string'
    }
}

const TR_TRACK_INSPECTION = {
    name: 'TR_TRACK_INSPECTION',
    primaryKey: 'TRACK_INSPECTION_CODE',
    properties: {
        TRACK_INSPECTION_CODE: 'string',
        BLOCK_INSPECTION_CODE: 'string',
        DATE_TRACK: 'string',
        LAT_TRACK: 'string',
        LONG_TRACK: 'string'
    }
}

const TR_BARIS_INSPECTION = {
    name: 'TR_BARIS_INSPECTION',
    primaryKey: 'ID',
    properties: {
        ID: 'int',
        BLOCK_INSPECTION_CODE: 'string',
        VALUE: 'string'
    }
}

const TM_AFD = {
    name: 'TM_AFD',
    // primaryKey: 'ID',
    properties: {
        REGION_CODE: 'int',
        COMP_CODE: 'int',
        EST_CODE: 'int',
        WERKS: 'int',
        AFD_CODE: 'string',
        AFD_NAME: 'string',
        WERKS_AFD_CODE: 'string',
        START_VALID: 'string',
        END_VALID: 'string',
        INSERT_TIME_DW: 'string',
        UPDATE_TIME_DW: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string',
        UPDATE_USER: 'string',
        UPDATE_TIME: 'string',
        FLAG_UPDATE: 'string',
    }
}

const TR_CATEGORY = {
    name: 'TR_CATEGORY',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        CATEGORY_NAME: 'string',
        ICON: 'string'
    }
}

const TR_CONTACT = {
    name: 'TR_CONTACT',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        USER_AUTH_CODE: 'string',
        EMPLOYEE_NIK: 'string',
        USER_ROLE: 'string',
        LOCATION_CODE: 'string',
        REF_ROLE: 'string',
    }
}

const TR_FINDING = {
    name: 'TR_FINDING',
    primaryKey: 'FINDING_CODE',
    properties: {
        FINDING_CODE: 'string',
        WERKS: 'string',
        AFD_CODE: 'string',
        BLOCK_CODE: 'string',
        FINDING_CATEGORY: 'string',
        FINDING_DESC: 'string',
        FINDING_PRIORITY: 'string',
        DUE_DATE: 'string',
        ASSIGN_TO: 'string',
        PROGRESS: 'int',
        LAT_FINDING: 'double',
        LONG_FINDING: 'double',
        REFFERENCE_INS_CODE: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string',
        UPDATE_USER: 'string',
        UPDATE_TIME: 'string',
        DELETE_USER: 'string',
        DELETE_TIME: 'string'
    }
}

const TR_LOG_FINDING = {
    name: 'TR_LOG_FINDING',
    // primaryKey: 'ID',
    properties: {
        FINDING_CODE: 'string',
        PROSES: 'string',
        PROGRESS: 'string',
        IMEI: 'string',
        SYNC_TIME: 'string',
        SYNC_USER: 'string'
    }
}

const TR_IMAGE_FINDING = {
    name: 'TR_IMAGE_FINDING',
    //primaryKey: 'IMAGE_CODE',
    properties: {
        IMAGE_CODE: 'string',
        TR_CODE: 'string',
        IMAGE_NAME: 'string',
        IMAGE_PATH: 'string',
        STATUS_IMAGE: 'string',
        STATUS_SYNG: 'string',
        SYNG_TIME: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string',
        UPDATE_USER: 'string',
        UPDATE_TIME: 'string',
        DELETE_USER: 'string',
        DELETE_TIME: 'string'
    }
}

// export default {
//     TR_LOGIN,
//     TR_BLOCK_INSPECTION_H,
//     TR_BLOCK_INSPECTION_D,
//     TR_IMAGE,
//     TR_TRACK_INSPECTION,
//     TR_BARIS_INSPECTION,
//     TM_AFD,
//     TR_CATEGORY,
//     TR_CONTACT,
//     TR_FINDING
// }

const T_LOG_IMAGE = {
    name: 'T_LOG_IMAGE',
    // primaryKey: 'ID',
    properties: {
        IMAGE_CODE: 'string',
        IMEI: 'string',
        STATUS_SYNC: 'string',
        SYNC_TIME: 'string',
        INSERT_USER: 'string'
    }
}

const TM_REGION = {
    name: 'TM_REGION',
    // primaryKey: 'ID',
    properties: {
        NATIONAL: 'string',
        REGION_CODE: 'string',
        REGION_NAME: 'string'
    }
}

const TM_BLOCK = {
    name: 'TM_BLOCK',
    properties: {
        REGION_CODE: 'string',
        COMP_CODE: 'string',
        EST_CODE: 'string',
        WERKS: 'string',
        AFD_CODE: 'string',
        BLOCK_CODE: 'string',
        BLOCK_NAME:'string',
        WERKS_AFD_CODE:'string',
        WERKS_AFD_BLOCK_CODE: 'string',
        LATITUDE_BLOCK: 'string',
        LONGITUDE_BLOCK: 'string'
    }
}

const TM_EST = {
    name: 'TM_EST',
    properties: {
        REGION_CODE: 'string',
        COMP_CODE: 'string',
        EST_CODE: 'string',
        WERKS: 'string',
        EST_NAME: 'string',
        CITY: 'string',
        START_VALID: 'string',
        END_VALID: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string',
        UPDATE_USER: 'string',
        UPDATE_TIME: 'string',
        FLAG_UPDATE: 'string'
    }
}

const TM_KRITERIA = {
    name: 'TM_KRITERIA',
    properties: {
        KRITERIA_CODE: 'string',
        CONTENT_LABEL_CODE: 'string',
        VALUE: 'string',
        COLOR: 'string',
        GRADE: 'string',
        BATAS_ATAS: 'string',
        BATAS_BAWAH: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string',
        UPDATE_USER: 'string',
        UPDATE_TIME: 'string',
        DELETE_USER: 'string',
        DELETE_TIME: 'string'
    }
}

const TM_USER_AUTH = {
    name: 'TM_USER_AUTH',
    properties: {
        USER_AUTH_CODE: 'string',
        EMPLOYEE_NIK: 'string',
        USER_ROLE: 'string',
        REFFERENCE_ROLE: 'string',
        LOCATION_CODE: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string',
        UPDATE_USER: 'string',
        UPDATE_TIME: 'string',
        DELETE_USER: 'string',
        DELETE_TIME: 'string'
    }
}

const TM_PJS = {
    name: 'TM_PJS',
    properties: {
        EMPLOYEE_NIK: 'string',
        USERNAME: 'string',
        NAMA_LENGKAP: 'string',
        JOB_CODE: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string',
        UPDATE_USER: 'string',
        UPDATE_TIME: 'string',
        DELETE_USER: 'string',
        DELETE_TIME: 'string'
    }
}

export default {
    TR_LOGIN,
    TR_BLOCK_INSPECTION_H,
    TR_BLOCK_INSPECTION_D,
    TR_IMAGE,
    TR_TRACK_INSPECTION,
    TR_BARIS_INSPECTION,
    TM_AFD,
    TR_FINDING,
    TR_LOG_FINDING,
    TR_IMAGE_FINDING,
    T_LOG_IMAGE,
    TR_CATEGORY,
    TR_CONTACT,

    //Add by Aminju
    TM_REGION,
    TM_BLOCK,
    TM_EST,
    TM_KRITERIA,
    TM_USER_AUTH,
    TM_PJS
}
