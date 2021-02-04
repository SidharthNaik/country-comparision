'use strict';

const controller = require('./population.controller');

function routes(app, rootUrl) {
  // include api version number
  let fullRootUrl = rootUrl + '/v1';

  /**
   * @apiVersion 1.0.0
   * @api {get} /population
   * @apiGroup Population
   * @apiName Get Population countries
   * @apiDescription Returns an array of country names and population
   *
   * @apiSampleRequest /api/v1/population?country=Brazil&country=India&sortDir=ASC
   * @apiQueryParam country mandatory country list
   * @apiQueryParam sortDir optional sort order "ASC" or "DES"
   *
   *
   * @apiSuccess {json} Array of country names and population
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   [
   *     {
   *         "country": "Brazil",
   *         "population": 216890231
   *     },
   *     {
   *         "country": "India",
   *         "population": 1397850271
   *     }
   *     ...
   *   ]
   *
   * @apiError (Error 500) InternalServerError Returned if there was a server error
   */
  app.get(
    { url: fullRootUrl + '/population' },
    controller.getCountriesPopulation
  );
}

module.exports = {
  routes: routes
};
