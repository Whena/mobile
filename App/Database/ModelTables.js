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
        STATUS_BLOCK: 'string',
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
        BLOCK_INSPECTION_CODE: 'string',
        IMAGE_NAME: 'string',
        IMAGE_PATH: 'string',
        STATUS_IMAGE: 'string',
        STATUS_SYNC: 'string'
    }
}

const TR_IMAGE_SELFIE = {
    name: 'TR_IMAGE_SELFIE',
    primaryKey: 'IMAGE_CODE',
    properties: {
        IMAGE_CODE: 'string',
        TR_CODE: 'string',
        BLOCK_INSPECTION_CODE: 'string',
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
        ID: 'string',
        BLOCK_INSPECTION_CODE: 'string',
        VALUE: 'string',
        TIME: 'string',
        DISTANCE: 'string'
    }
}

const TM_REGION = {
    name: 'TM_REGION',
    primaryKey: 'REGION_CODE',
    properties: {
        NATIONAL: 'string',
        REGION_CODE: 'string',
        REGION_NAME: 'string'
    }
}

const TM_COMP = {
    name: 'TM_COMP',
    primaryKey: 'COMP_CODE',
    properties: {
        NATIONAL: 'string',
        REGION_CODE: 'string',
        COMP_CODE: 'string',
        COMP_NAME: 'string',
        ADDRESS: 'string'
    }
}

const TM_EST = {
    name: 'TM_EST',
    primaryKey: 'WERKS',
    properties: {
        REGION_CODE: 'string',
        COMP_CODE: 'string',
        EST_CODE: 'string',
        EST_NAME: 'string',
        WERKS: 'string',
        CITY: 'string'
    }
}

const TM_AFD = {
    name: 'TM_AFD',
    primaryKey: 'WERKS_AFD_CODE',
    properties: {
        REGION_CODE: 'string',
        COMP_CODE: 'string',
        EST_CODE: 'string',
        WERKS: 'string',
        AFD_CODE: 'string',
        AFD_NAME: 'string',
        WERKS_AFD_CODE: 'string'
    }
}

const TM_BLOCK = {
    name: 'TM_BLOCK',
    primaryKey: 'WERKS_AFD_BLOCK_CODE',
    properties: {
        REGION_CODE: 'string',
        COMP_CODE: 'string',
        EST_CODE: 'string',
        WERKS: 'string',
        AFD_CODE: 'string',
        BLOCK_CODE: 'string',
        BLOCK_NAME: 'string',
        WERKS_AFD_CODE: 'string',
        WERKS_AFD_BLOCK_CODE: 'string',
        LATITUDE_BLOCK: 'string',
        LONGITUDE_BLOCK: 'string'
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
    primaryKey: 'EMPLOYEE_NIK',
    properties: {
        USER_AUTH_CODE: 'string',
        EMPLOYEE_NIK: 'string',
        USER_ROLE: 'string',
        LOCATION_CODE: 'string',
        REF_ROLE: 'string',
        HRIS_JOB: 'string',
        HRIS_FULLNAME: 'string'
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

const TM_KRITERIA = {
    name: 'TM_KRITERIA',
    properties: {
        KRITERIA_CODE: 'string',
        CONTENT_LABEL_CODE: 'string',
        VALUE: 'string',
        COLOR: 'string',
        GRADE: 'string',
        BATAS_ATAS: {type: 'int', default: 0},
        BATAS_BAWAH: {type: 'int', default: 0}
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

const TM_LAND_USE = {
    name: 'TM_LAND_USE',
    primaryKey: 'WERKS_AFD_BLOCK_CODE',
    properties: {
        NATIONAL: 'string',
        REGION_CODE: 'string',
        COMP_CODE: 'string',
        WERKS: 'string',
        SUB_BA_CODE: 'string',
        KEBUN_CODE: 'string',
        AFD_CODE: 'string',
        AFD_NAME: 'string',
        WERKS_AFD_CODE: 'string',
        BLOCK_CODE: 'string',
        BLOCK_NAME: 'string',
        WERKS_AFD_BLOCK_CODE: 'string',
        LAND_USE_CODE: 'string',
        LAND_USE_NAME: 'string',
        LAND_USE_CODE_GIS: 'string',
        SPMON: {type: 'int', default: 0},
        LAND_CAT: 'string',
        LAND_CAT_L1_CODE: 'string',
        LAND_CAT_L1: 'string',
        LAND_CAT_L2_CODE: 'string',
        MATURITY_STATUS: 'string',
        SCOUT_STATUS: 'string',
        AGES: {type: 'int', default: 0},
        HA_SAP: 'string',
        PALM_SAP: 'string',
        SPH_SAP: 'string',
        HA_GIS: 'string',
        PALM_GIS: {type: 'int', default: 0},
        SPH_GIS: {type: 'int', default: 0}
    }
}

const TM_CONTENT = {
    name: 'TM_CONTENT',
    properties: {
        CONTENT_CODE: 'string',
        GROUP_CATEGORY: 'string',
        CATEGORY: 'string',
        CONTENT_NAME: 'string',
        UOM: 'string',
        FLAG_TYPE: 'string',
        URUTAN: 'string'
    }
}

const TM_CONTENT_LABEL = {
    name: 'TM_CONTENT_LABEL',
    properties: {
        CONTENT_LABEL_CODE: 'string',
        CONTENT_CODE: 'string',
        LABEL_NAME: 'string',
        LABEL_ICON: 'string',
        URUTAN_LABEL: 'string',
        LABEL_SCORE: {type: 'int', default: 0}
    }
}
export default {
    TR_LOGIN,
    TR_BLOCK_INSPECTION_H,
    TR_BLOCK_INSPECTION_D,
    TR_IMAGE,
    TR_IMAGE_SELFIE,
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
    TM_PJS,
    TM_LAND_USE,
    TM_COMP,
    TM_CONTENT,
    TM_CONTENT_LABEL
}
