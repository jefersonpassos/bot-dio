const middy = require('middy');

const bodyParserMiddy = require('../middys/BodyParser');
const apiResponseMiddy = require('../middys/ApiResponse');


const getAction = ({ actionName }) => {

  const action = require(`../Actions/${actionName}`);

  return action;
}

const Orchestrator = async (event, context, cb) => {

    console.log(JSON.stringify(event.body, null, 2));

    const { queryResult } = event.body;

    const payload = {
      action: queryResult.action,
      parameters: queryResult.parameters
    }

    const action = getAction({ actionName: queryResult.action });
    const messages = await action.run({ payload });

    
    const reponseDialog = {
      fulfillmentMessages: [
        ...messages.map(message => ({ text: { text: [message] } })),
      ]
    }

    cb(null, {
        statusCode: 200,
        data: reponseDialog,
    });

};

module.exports.orchestrator = middy(Orchestrator)
    .use(bodyParserMiddy())
    .use(apiResponseMiddy());