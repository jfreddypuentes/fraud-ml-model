/**
 * Conexion a la base de datos del modelo.
*/
const sqlite3 = require('sqlite3').verbose();

exports.getModelData = function(model_id, callback){
    let db = new sqlite3.Database('./ml_database.db');
    var data = []; 
    db.serialize(function() {
        let sql = `SELECT id, 
                coeficiente_0, 
                coeficiente_1, 
                coeficiente_2, 
                coeficiente_3, 
                coeficiente_4, 
                coeficiente_5,
                error
                FROM model WHERE id = ${model_id}`;
        db.each(sql, function(err, row) {
            data.push(row);
        }, function(){
            db.close();
            callback(data); 
        });
    });
}