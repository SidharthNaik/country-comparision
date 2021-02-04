'use strict';

const got = require('got');

module.exports = async (url) => {
  try {
    const response = await got(url);
    return response.body;
  } catch (error) {
    throw error;
  }
};
