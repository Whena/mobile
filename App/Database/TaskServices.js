import RealmSchemas from './RealmSchema'

const TaskServices = {

  getPath: function () {
    return RealmSchemas.path;
  },

  saveData: function (table, obj) {
    var saved = null;
    console.log('Save Data : ' + table + ' ' + JSON.stringify(obj));

    RealmSchemas.write(() => {
      saved = RealmSchemas.create(table, obj, true);
    })
    return saved;
  },

  updatedDataNew: function (table, primary_key, obj) {
    var updated = null;
    console.log('Update Data : ' + table + ' ' + JSON.stringify(obj));

    RealmSchemas.write(() => {
      updated = RealmSchemas.create(table, { REGION_CODE: primary_key, obj }, true);
    })
    return updated;
  },

  deleteDataNew: function (table, primary_key, obj) {
    var deleted = null;
    console.log('Delete Data : ' + table + ' ' + JSON.stringify(obj));

    RealmSchemas.write(() => {
      deleted = RealmSchemas.delete(table, { REGION_CODE: primary_key, obj }, true);
    })
    return deleted;
  },

  getAllData: function (table) {
    return RealmSchemas.objects(table);
  },

  getTotalData: function (table) {
    return RealmSchemas.objects(table).length;
  },

  findBy2: function (table, param, value) {
    let list = RealmSchemas.objects(table);
    return list.filtered(param + ' == \"' + value + '\" ')[0];
  },

  findBy: function (table, param, value) {
    let list = RealmSchemas.objects(table);
    return list.filtered(param + ' == \"' + value + '\" ');
  },

  query: function (table, query) {
    let list = RealmSchemas.objects(table);
    return list.filtered(query);
  },

  deleteTest: function (object) {
    RealmSchemas.write(() => {
      RealmSchemas.delete(object);
    });
  },


  deleteTrackInsByTrackInsCode: function (value) {
    let total = RealmSchemas.objects('TR_TRACK_INSPECTION');
    for (var i = 0; i < total.length; i++) {
      if (value === total[i].TRACK_INSPECTION_CODE) {
        RealmSchemas.write(() => {
          RealmSchemas.delete(RealmSchemas.objects('TR_TRACK_INSPECTION')[i]);
        });
      }
    }
  },

  deleteInpeksiHeaderByBlockInsCode: function (value) {
    let total = RealmSchemas.objects('TR_BLOCK_INSPECTION_H');
    for (var i = 0; i < total.length; i++) {
      if (value === total[i].BLOCK_INSPECTION_CODE) {
        RealmSchemas.write(() => {
          RealmSchemas.delete(RealmSchemas.objects('TR_BLOCK_INSPECTION_H')[i]);
        });
      }
    }
  },

  deleteTRBaris: function (value) {
    let total = RealmSchemas.objects('TR_BARIS_INSPECTION');
    for (var i = 0; i < total.length; i++) {
      if (value === total[i].BLOCK_INSPECTION_CODE) {
        RealmSchemas.write(() => {
          RealmSchemas.delete(RealmSchemas.objects('TR_BARIS_INSPECTION')[i]);
        });
      }
    }
  },

  deleteTRBarisByID: function (value) {
    let total = RealmSchemas.objects('TR_BARIS_INSPECTION');
    for (var i = 0; i < total.length; i++) {
      if (value === total[i].ID) {
        RealmSchemas.write(() => {
          RealmSchemas.delete(RealmSchemas.objects('TR_BARIS_INSPECTION')[i]);
        });
      }
    }
  },

  deleteBy: function (table, param, value) {
    let sortedPeople = RealmSchemas.objects(table).sorted(param)
    let Dave = RealmSchemas.objects(table).filtered("ID=1")
    let indexOfDave = sortedPeople.indexOf(Dave)
    return indexOfDave;
  },

  //   deleteByQuery(table, param, value){    
  //     RealmSchemas.write(() => {
  //         RealmSchemas.delete(RealmSchemas.objects(table).filtered(param+' == \"'+ value +'\" '));        
  //     })
  //   },


  //deleteby

  //   RealmSchema.write(() => {           
  //     RealmSchema.delete(RealmSchema.objects('TR_TRACK_INSPECTION')[0]);

  // });

  //update yg jalan
  // var data = RealmSchema.objects('TR_TRACK_INSPECTION');
  // RealmSchema.write(() => {
  //     data[0].LAT_TRACK = 'HATI'
  // })

  deleteData: function (table, obj) {
    RealmSchemas.write(() => {
      let data = RealmSchemas.create(table, obj);
      RealmSchemas.delete(data);
    })
  },

  deleteAllData: function (table) {
    RealmSchemas.write(() => {
      let data = RealmSchemas.objects(table);
      RealmSchemas.delete(data);
    })
  },

  updateData: function (table, whereClause, value) {
    var data = RealmSchemas.objects(table);
    var field = whereClause;
    RealmSchemas.write(() => {
      data[0].field = value
    })
  },

  updateData2: function (table, whereClause, valueClause, param, value) {
    let list = RealmSchemas.objects(table);
    // list = list.filtered(whereClause+' == \"'+ valueClause +'\" ')[0];

    // RealmSchemas.write(() => { 
    //   var ID = this.state.Student_Id - 1;

    //   var data = realm.objects('Student_Info');

    //   data[ID].student_name = this.state.Student_Name;
    //   data[ID].student_class = this.state.Student_Class;
    //   data[ID].student_subject = this.state.Student_Subject;

    //  });

    RealmSchemas.write(() => {
      for (var i = 0; i < list.length; i++) {
        data[i].param = value[i]
      }
    });
  },

  updateInspectionHScore: function (blockCode, param) {
    let data = RealmSchemas.objects('TR_BLOCK_INSPECTION_H').filtered('BLOCK_INSPECTION_CODE == \"' + blockCode + '\" ')[0];
    RealmSchemas.write(() => {
      data.INSPECTION_SCORE = param[0];
      data.INSPECTION_RESULT = param[1];
      data.END_INSPECTION = param[2];
      data.LAT_END_INSPECTION = param[3];
      data.LONG_END_INSPECTION = param[4];
    });
  },

  deleteTmRegionByRegionCode: function (value) {
    let total = RealmSchemas.objects('TM_REGION');
    for (var i = 0; i < total.length; i++) {
      if (value === total[i].REGION_CODE) {
        RealmSchemas.write(() => {
          RealmSchemas.delete(RealmSchemas.objects('TM_REGION')[i]);
        });
      }
    }
  },

  updateTmRegionByRegionCode: function (regionCode, param) {
    let data = RealmSchemas.objects('TM_REGION').filtered('REGION_CODE == \"' + regionCode + '\" ')[0];
    RealmSchemas.write(() => {
      data.NATIONAL = param[0];
      data.REGION_CODE = param[1];
      data.REGION_NAME = param[2];
    });
  },

  findByWithList: function (table, listWhereClause, listValueClause) {
    let list = RealmSchemas.objects(table);
    let str = '';

    for (var i = 0; i < listWhereClause.length; i++) {
      if (i == 0) {
        str = listWhereClause[i] + '= "' + listValueClause[i] + '" '
      }
      else {
        str = str + ' AND ' + listWhereClause[i] + '= "' + listValueClause[i] + '" '
      }
    }
    // console.log(str)
    return list.filtered(str);
    // return list.filtered(param+' == \"'+ value +'\" AND BLOCK_INSPECTION_CODE == \"'+blokInsCode+ '\"');
  },

};

export default TaskServices;
