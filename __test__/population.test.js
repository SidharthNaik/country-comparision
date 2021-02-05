
const populationHelper = require("../src/lib/population-helper");


test("get population of a country", async () => {
  const population = await populationHelper.getPopulation(
    "India",
    "2021-02-05"
  );
  expect(population).toEqual(1397891421);
});

test("builds list of countries", async () => {
  const population = await populationHelper.buildCountryList("India,Brazil");
  expect(population).toEqual(["India", "Brazil"]);
});