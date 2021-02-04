'use strict';

const config = require('../config');
const util = require('./util');
const gotRequest = require('./got-request');
const countryHelper = require('./country-helper');
const NodeCache = require('node-cache');
const populationCache = new NodeCache();

function getPopulationApiPath() {
  return (
    config.api.protocol +
    '://' +
    config.api.host +
    config.api.rootPath +
    '/population'
  );
}

exports.getPopulation = async function getpopulation(countryName, date) {
  if (!populationCache.has(countryName + date)) {
    populationCache.set(
      countryName + date,
      JSON.parse(
        await gotRequest(
          getPopulationApiPath() + '/' + countryName + '/' + date
        )
      ).total_population.population
    );
  }
  return populationCache.get(countryName + date);
};

exports.buildCountryList = async function buildCountryList(countryParam) {
  if (countryParam === undefined || countryParam === '') {
    throw Error('No Countries specified');
  }
  const countries = util.buildArray(countryParam);
  const validCountries = await countryHelper.getCountries();
  const validCountrieslc = validCountries.map((item) => item.toLowerCase());
  const countryList = [];
  for (const country of countries) {
    if (validCountrieslc.indexOf(country.toLowerCase()) === -1) {
      throw Error('Invalid country - ' + country + ' .Please Select a valid country');
    } else {
      countryList.push(
        validCountries[validCountrieslc.indexOf(country.toLowerCase())]
      );
    }
  }
  return countryList;
};
