'use strict';

const co = require('co');
const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');

exports.getCountries = co.wrap(function* getCountries(req, res, next) {
  try {
    res.json(yield countryHelper.getCountries());
    return next();
  } catch (err) {
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});
