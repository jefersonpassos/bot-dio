const Wiki = require('wikijs').default;


module.exports.run = async ({ payload }) => {

    const wikiAction = async ({ searchValue }) => {
        const wikiService = Wiki({ apiUrl: 'https://pt.wikipedia.org/w/api.php' });  
        const text = await wikiService.find(searchValue).then(response => response.summary());
    
        const messages = text.split('\n').filter(message => message);
    
        return messages;
    };

    const { searchValue } = payload.parameters;
    const response = await wikiAction({ searchValue });

    return response;
};