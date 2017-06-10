'use strict';

module.exports = function(Cat) {
  Cat.status = function(cb) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const response = (currentHour > 6 && currentHour < 20) ?
      'We are open for business.' :
      'Sorry, we are closed. Open daily from 6am to 8pm.'

    cb(null, response);
  };
  Cat.remoteMethod('status', {
      http: {path: '/status', verb: 'get'},
      returns: {arg: 'status', type: 'string'}
    }
  );
};
