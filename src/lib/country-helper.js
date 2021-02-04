'use strict';

const config = require('../config');
const gotRequest = require('./got-request');
const NodeCache = require('node-cache');
const countryCache = new NodeCache();

// const countries = [
//   'Afghanistan',
//   'AFRICA',
//   'Albania',
//   'Algeria',
//   'Angola',
//   'Antigua and Barbuda',
//   'Arab Rep of Egypt',
//   'Argentina',
//   'Armenia',
//   'Aruba',
//   'ASIA',
//   'Australia',
//   'Australia/New Zealand',
//   'Austria',
//   'Azerbaijan'
// ];

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
