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
        STATUS: 'string'
    }
}

const TR_BLOCK_INSPECTION_H = {
    name: 'TR_BLOCK_INSPECTION_H',
    primaryKey: 'BLOCK_INSPECTION_CODE',
    properties: {
        BLOCK_INSPECTION_CODE: 'string',
        ID_INSPECTION: 'string',
        WERKS: 'string',
        AFD_CODE: 'string',
        BLOCK_CODE: 'string',
        AREAL: 'string',
        INSPECTION_TYPE: "string",
        STATUS_BLOCK: 'string',
        INSPECTION_DATE: 'string',
        INSPECTION_RESULT: 'string',
        INSPECTION_SCORE: 'string',
        STATUS_SYNC: 'string',
        SYNC_TIME: 'string',
        START_INSPECTION: 'string',
        END_INSPECTION: 'string',
        LAT_START_INSPECTION: 'string',
        LONG_START_INSPECTION: 'string',
        LAT_END_INSPECTION: 'string',
        LONG_END_INSPECTION: 'string',
        INSERT_TIME: 'string',
        INSERT_USER: 'string',
        TIME: 'string',
        DISTANCE: 'string'
    }
}

const TR_BLOCK_INSPECTION_D = {
    name: 'TR_BLOCK_INSPECTION_D',
    primaryKey: 'BLOCK_INSPECTION_CODE_D',
    properties: {
        BLOCK_INSPECTION_CODE_D: 'string',
        BLOCK_INSPECTION_CODE: 'string',
        ID_INSPECTION: 'string',
        CONTENT_INSPECTION_CODE: 'string',
        VALUE: 'string',
        AREAL: 'string',
        STATUS_SYNC: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string'
    }
}

const TR_BARIS_INSPECTION = {
    name: 'TR_BARIS_INSPECTION',
    primaryKey: 'ID_INSPECTION',
    properties: {
        ID_INSPECTION: 'string',
        BLOCK_INSPECTION_CODE: 'string',
        EST_NAME: 'string',
        BLOCK_CODE: 'string',
        AFD_CODE: 'string',
        INSPECTION_DATE: 'string',
        STATUS_SYNC: 'string',
        INSPECTION_RESULT: 'string',
        INSPECTION_SCORE: 'string'
    }
}

const TR_IMAGE = {
    name: 'TR_IMAGE',
    primaryKey: 'IMAGE_CODE',
    properties: {
        TR_CODE: 'string',
        IMAGE_CODE: 'string',
        IMAGE_NAME: 'string',
        IMAGE_PATH_LOCAL: 'string',
        IMAGE_URL: 'string',
        STATUS_IMAGE: 'string',
        STATUS_SYNC: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string'
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
    primaryKey: 'CATEGORY_CODE',
    properties: {
        CATEGORY_CODE: 'string',
        CATEGORY_NAME: 'string',
        ICON: 'string',
        ICON_URL: 'string'
    }
}

const TR_CONTACT = {
    name: 'TR_CONTACT',
    primaryKey: 'USER_AUTH_CODE',
    properties: {
        USER_AUTH_CODE: 'string',
        EMPLOYEE_NIK: 'string',
        USER_ROLE: 'string',
        LOCATION_CODE: { type: 'string', optional: true },
        REF_ROLE: 'string',
        JOB: 'string',
        FULLNAME: 'string'
    }
}

const TR_FINDING = {
    name: 'TR_FINDING',
    primaryKey: 'FINDING_CODE',
    properties: {
        FINDING_CODE: { type: 'string', optional: true },
        WERKS: { type: 'string', optional: true },
        AFD_CODE: { type: 'string', optional: true },
        BLOCK_CODE: 'string',
        FINDING_CATEGORY: 'string',
        FINDING_DESC: 'string',
        FINDING_PRIORITY: 'string',
        DUE_DATE: 'string',//{ type: 'int', default: 0 },
        STATUS: { type: 'string', optional: true },
        ASSIGN_TO: 'string',
        PROGRESS: { type: 'int', default: 0 },//'string',
        LAT_FINDING: 'string',
        LONG_FINDING: 'string',
        REFFERENCE_INS_CODE: 'string',
        INSERT_USER: { type: 'string', optional: true },
        INSERT_TIME: { type: 'int', default: 0 },
        STATUS_SYNC: 'string'
    }
}

const TM_KRITERIA = {
    name: 'TM_KRITERIA',
    primaryKey: 'KRITERIA_CODE',
    properties: {
        KRITERIA_CODE: 'string',
        COLOR: 'string',
        GRADE: 'string',
        BATAS_ATAS: 'float',
        BATAS_BAWAH: 'float'
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
        SPMON: { type: 'int', default: 0 },
        LAND_CAT: 'string',
        LAND_CAT_L1_CODE: 'string',
        LAND_CAT_L1: 'string',
        LAND_CAT_L2_CODE: 'string',
        MATURITY_STATUS: 'string',
        SCOUT_STATUS: 'string',
        AGES: { type: 'int', default: 0 },
        HA_SAP: 'string',
        PALM_SAP: 'string',
        SPH_SAP: 'string',
        HA_GIS: 'string',
        PALM_GIS: { type: 'int', default: 0 },
        SPH_GIS: { type: 'int', default: 0 }
    }
}

const TM_CONTENT = {
    name: 'TM_CONTENT',
    primaryKey: 'CONTENT_CODE',
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
    primaryKey: 'CONTENT_LABEL_CODE',
    properties: {
        CONTENT_LABEL_CODE: 'string',
        CONTENT_CODE: 'string',
        LABEL_NAME: 'string',
        LABEL_ICON: 'string',
        URUTAN_LABEL: 'string',
        LABEL_SCORE: { type: 'int', default: 0 }
    }
}

const TM_INSPECTION_TRACK = {
    name: 'TM_INSPECTION_TRACK',
    properties: {
        TRACK_INSPECTION_CODE: 'string',
        BLOCK_INSPECTION_CODE: 'string',
        DATE_TRACK: 'string',
        LAT_TRACK: 'string',
        LONG_TRACK: 'string',
        INSERT_USER: 'string',
        INSERT_TIME: 'string',
        STATUS_SYNC: 'string'
    }
}

const TM_TIME_TRACK = {
    name: 'TM_TIME_TRACK',
    properties: {
        PARAMETER_GROUP: 'string',
        PARAMETER_NAME: 'string',
        DESC: 'string',
        NO_URUT: { type: 'int', default: 0 }
    }
}

export default {
    TR_LOGIN,
    TR_BLOCK_INSPECTION_H,
    TR_BLOCK_INSPECTION_D,
    TR_IMAGE,
    TR_BARIS_INSPECTION,
    TM_AFD,
    TR_FINDING,
    TR_CATEGORY,
    TR_CONTACT,

    //Add by Aminju
    TM_REGION,
    TM_BLOCK,
    TM_EST,
    TM_KRITERIA,
    TM_PJS,
    TM_LAND_USE,
    TM_COMP,
    TM_CONTENT,
    TM_CONTENT_LABEL,
    TM_INSPECTION_TRACK,
    TM_TIME_TRACK
}
