'use strict';

const config = require('../config');
const gotRequest = require('./got-request');
const NodeCache = require('node-cache');
const countryCache = new NodeCache();

function getCountriesApiPath() {
  return (
    config.api.protocol +
    '://' +
    config.api.host +
    config.api.rootPath +
    '/countries'
  );
}

exports.getCountries = async function getCountries() {
  if (!countryCache.has('allCountries')) {
    countryCache.set(
      'allCountries',
      JSON.parse(await gotRequest(getCountriesApiPath())).countries
    );
  }
  return countryCache.get('allCountries');
};
