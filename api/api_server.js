/**
 * Exposicion del Modelo mediante servicio web.
 * 
*/
var express = require('express')
const connection = require('./data_base');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express()

app.use(cors());
app.use(bodyParser.json())

/**
 * Function de activacion Sigmoide.
 * Calcula el resultado segun el modelo recibido.
*/
function prediction(x1, x2, x3, x4, x5, model){
    const potencia = model[0].coeficiente_0 * x1 + model[0].coeficiente_1*x2 + 
                    model[0].coeficiente_2 * x3 + model[0].coeficiente_3 * x4 + model[0].coeficiente_4 * x5 + model[0].error;
    return 1 / (1 + Math.pow(Math.E, -(potencia)));
}

/**
 * Servicio web.
*/
app.post('/api/v1/fraud/predict', function (req, res) {
    const x1 = req.body.tipo_persona;
    const x2 = req.body.codigo_actividad_economica;
    const x3 = req.body.subtipo_cotizante;
    const x4 = req.body.tipo_cotizante;
    const x5 = req.body.edad;

    const honesty_rate = req.body.honesty_rate;
    const limit = 1 - honesty_rate;

    connection.getModelData(1, function(model1){
        connection.getModelData(2, function(model2){
            result1 = prediction(x1, x2, x3, x4, x5, model1);
            result2 = prediction(x1, x2, x3, x4, x5, model2);
            average = ((result1 + result2) / 2);
            isFraud = average > limit;

            fraude_message = "Compruebe que los datos ingresos correspondan a la realidad de la persona y/o empresa"
            ok_message = "Todo OK. Puede proceder con el registro de la planilla."
            final_message = (isFraud) ? fraude_message : ok_message

            response = {
                "status": "OK",
                "message": "SUCCESS",
                "data":{
                    "isFraud": isFraud,
                    "probability1": (result1 * 100).toFixed(2),
                    "probability2": (result2 * 100).toFixed(2),
                    "average": (average * 100).toFixed(2),
                    "format": (average * 100).toFixed(2) + "%",
                    "status": isFraud ? "ALERTA" : "OK",
                    "result": isFraud ? "Validación anti-fraude fallida" : "Validación anti-fraude exitosa",
                    "message": final_message
                }
            }
            res.status(200).send(response);
        });
    });
});

port = 3000
console.log(`Server running... port:${port}`);
app.listen(port);