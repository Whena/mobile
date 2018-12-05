import RealmSchemas from './RealmSchema'

let TaskServices = {

  getPath: function(){
    return RealmSchemas.path;
  },

  saveData: function(table, obj){
    var saved = null;
    console.tron.log('save(): '+table+ ' ' + obj);
    RealmSchemas.write(() => {
      saved = RealmSchemas.create(table, obj, true);
    })
    return saved;
  },

  getAllData: function(table){
    return RealmSchemas.objects(table);
  },

  getTotalData: function(table){
    return RealmSchemas.objects(table).length;
  },

  findBy: function(table, param, value){
    let list = RealmSchemas.objects(table);
    return list.filtered(param+' == \"'+ value +'\" ')[0];
  },

  findBy2: function(table, value){
    let list = RealmSchemas.objects(table);
    return list.filtered(param+' == \"'+ value +'\" ');
  },

  query: function(table, query){
    let list = RealmSchemas.objects(table);
    return list.filtered(query);
  },

  deleteBy: function(table, param, value){
    RealmSchemas.write(() => { 
      let total =  RealmSchemas.objects(table);
      var idx; 
      for(var i; i<total.length; i++){
        if(total[0].param === value){
          idx=i;
          break;
        }
      }
      RealmSchemas.delete(RealmSchemas.objects(table)[idx]); 
    });
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

  deleteData: function(table, obj){
    console.log('delete(): '+table+ ' ' + obj);
    RealmSchemas.write(() => {
      let data = RealmSchemas.create(table, obj);
      RealmSchemas.delete(data);
    })
  },

  deleteAllData: function(tabl){
    RealmSchemas.write(() => {
      let data = RealmSchemas.objects(table);
      RealmSchemas.delete(data);
    })
  },

  updateData: function(table, whereClause, value){
    var data = RealmSchemas.objects(table);
    var field = whereClause;
    RealmSchemas.write(() => {
      data[0].field = value
    })
  },

  updateData2: function(table, whereClause, valueClause, param, value){
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
      for(var i=0; i<list.length; i++){
        data[i].param = value[i]
      }
    });
  }

};

module.exports = TaskServices;
