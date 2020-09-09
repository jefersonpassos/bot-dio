const jsonBodyParser = () => ({
    before: (handler, next) => {
      // eslint-disable-next-line no-param-reassign
      handler.event.body = JSON.parse(handler.event.body);
      next();
    },
  });
  
  module.exports = jsonBodyParser;
  