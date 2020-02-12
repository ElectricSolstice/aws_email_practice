const aws = require('aws-sdk');
aws.config.update({
    region: process.env.SES_REGION
})
//const ses = new aws.SES({region: 'us-west-2'});
const ses = new aws.SES({region: process.env.SES_REGION});
const dynamo = new aws.DynamoDB.DocumentClient();

const randomBytes = require('crypto').randomBytes;

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function handlerResponse (status, bodyMessage) {
    const response = {
        statusCode: status,
        body: JSON.stringify(bodyMessage)
    };
    return response;
}

exports.handler = (ev, context, callback) => {
    if (ev.name && ev.email) {
        var message = "";
        if (ev.message) {
            message = ev.message;
        } 
        const from = process.env.FROM_NAME + "<" + process.env.FROM_EMAIL + ">";
        const params = {
            Source: from,
            Destination: { ToAddresses : [ ev.email ]},
            Message: {
                Subject: {
                    Data: ev.name,
                    Charset: 'UTF-8'
                },
                Body: {
                    Text: {
                        Data: message,
                        Charset: 'UTF-8'
                    }
                }
            }
            
        };
        
        console.log("Params:\n");
        console.log(params+"\n");
        ses.sendEmail(params, (err, data) => {
            callback(null, {err: err, data: data});
            if (err) {
                context.fail(err);
            }  else {
                const messageId = ev.email+toUrlString(randomBytes(16));
                const dbItem = {
                    TableName: "AWSSampleContacts",
                    Item: {
                        ContactId: messageId,
                        Message: params.Message
                    }
                };
                dynamo.put(dbItem, function(err,data) {
                    if (err) {
                        console.log(err, err.stack);
                    } else {
                        console.log(data);
                    }
                });
                context.succeed(ev);
            }
        });
    } else {
        return handlerResponse(400, 'Missing subject and/or body');
    }
    
};
