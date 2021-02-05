const country = require('../src/lib/country-helper');

test('get country list', async () => {
  const countries = await country.getCountries();
  expect(countries).toContain('India');
});
