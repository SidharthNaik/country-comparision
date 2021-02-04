'use strict';

module.exports = {
  buildArray: (data, sep = ',') => {
    if (data instanceof Array) { return data; }
    return data.split(sep);
  },

  arraySort: (data, param, dir = 'ASC') => {
    if (dir === 'ASC') {
      data.sort((obj1, obj2) => {
        return obj1[param] - obj2[param];
      });
    }
    if (dir === 'DES') {
      data.sort((obj1, obj2) => {
        return obj2[param] - obj1[param];
      });
    }
    return data;
  }
};
