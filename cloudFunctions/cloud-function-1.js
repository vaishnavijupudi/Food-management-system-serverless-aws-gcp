/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} request HTTP request context.
 * @param {!express:Response} result HTTP response context.
 */

 const automl = require('@google-cloud/automl');
 const predictClient = new automl.PredictionServiceClient();
 
 require("dotenv").config();
 
 const projectid = ""+process.env.PROJECT_ID
 const model = process.env.MODEL
 const location = ""+process.env.LOCATION
 const functions = require('firebase-functions');
 
 
 const request_predict_type = (message, callBack) => {
   const requestBody = {
     name: predictClient.modelPath(projectid, location, model),
     payload: {
       "textSnippet": {
         "content": message,
         "mime_type": "text/plain"
       }
     }
   }
   predictClient.predict(requestBody)
   .then(response => {
     console.log(JSON.stringify(response))
     console.log(response[0]['payload'][0]['displayName'])
     const type = response[0]['payload'][0]['displayName']
     return callBack(null, type)
   })
   .catch( err => {
     console.log(err)
     callBack(err)
   })
 }; 

 exports.helloWorld = functions.https.onRequest((request, result) => {
 
    result.set('Access-Control-Allow-Origin', '*');
    result.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    result.set('Access-Control-Allow-Headers', '*');
   if (request.method === "OPTIONS") {
     // stop preflight requests here
     result.status(204).send('');
     return;
   }
   try {
     let message = request.query.message || request.body.message || 'Hello World!';
     console.log(message)
     request_predict_type(message, async (err, results) => {
         if (err) {
           return result.status(500).json({ code: err.code, message: err.message });
         }
         if (!results) {
           const error = {
             code: "Issue to fetch",
             message: "Something went wrong",
           };
           return handleError(result, error);
         }
         return result.status(201).json({
           success: true,
           message: results
         });
       });
   } catch (err) {
     return result.status(500).json({ code: err.code, message: err.message });
   }
 });
 