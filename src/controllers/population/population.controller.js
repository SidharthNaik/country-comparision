'use strict';

const co = require('co');
const errors = require('restify-errors');
const populationHelper = require('../../lib/population-helper');
const util = require('../../lib/util');

exports.getCountriesPopulation = co.wrap(function* getCountriesPopulation(req, res, next) {
  try {
    let PopulationArr = [];
    // Post auth the user's country can be added to the following list if not already present
    const countryList = yield populationHelper.buildCountryList(req.query.country);
    // Modify the following line for Date as query param
    const populationDate = new Date().toISOString().slice(0, 10);
    for (let country of countryList) {
      let population = yield populationHelper.getPopulation(country, populationDate);
      PopulationArr.push({ country: country, population: population });
    }
    if (req.query.sortDir) {
      util.arraySort(PopulationArr, 'population', req.query.sortDir);
    }
    res.json(PopulationArr);
    return next();
  } catch (err) {
    return next(
      new errors.InternalServerError(
        err,
        'Server error retrieving country population.'
      )
    );
  }
});
