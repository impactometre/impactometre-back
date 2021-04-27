'use strict';

const SCENARIO_ID_HEADER = 'scenario';

const getHeaders = (computedScenarios) => {
  const scenarioDamage = computedScenarios[0]._damage;
  const categories = Object.keys(scenarioDamage).map(c => c.replace('_', ''));
  const spheres = Object.keys(scenarioDamage._hardwareDamage._totalDamage).map(s => s.replace('_', ''));

  const headers = spheres.map(sphere => categories.map(category => `${sphere}_${category}`));

  const flattenedHeaders = headers.reduce((accumulator, current) => {
    return [
      ...accumulator,
      ...current,
    ];
  }, []);

  flattenedHeaders.unshift(SCENARIO_ID_HEADER);

  return flattenedHeaders;
};

/**
 * For a given category in a scenario and each sphere in rawDamage
 * replace headers in the scenarioValues array
 * by the corresponding damage values 
 * @param {Object} rawDamage The damages of each impact sphere
 * @param {String} category  The component category
 * @param {Array} scenarioValues  The scenarioValues array to update
 * @returns {Array} The scenarioValues array updated
 */
const replaceHeadersByDamages = (rawDamage, category, scenarioValues) => {
  Object.entries(rawDamage).forEach(([sphere, damageValue]) => {      
    const index = scenarioValues.indexOf(`${sphere.replace('_', '')}${category}`);
    scenarioValues[index] = damageValue;
  })

  return scenarioValues;
}

/**
 * Format export data to csv.
 * @param {Array<Object>} computedScenarios Raw scenarios to format (with damages).
 * @returns {String} Sceanrios damages in csv format.
 */
const formatExportService = (computedScenarios) => {
  const headers = getHeaders(computedScenarios);

  const csvData = computedScenarios.map(scenario => {
    // Initialize returned array with headers.
    // Then, replace each header by its computed damage value.
    let scenarioValues = JSON.parse(JSON.stringify(headers));

    Object.entries(scenario._damage).forEach(([category, data]) => {
      // Total damages part is not formatted like the rest of the object.
      if (category === '_totalDamage') {
        scenarioValues = replaceHeadersByDamages(data, category, scenarioValues);

        return;
      }
      
      const damage = data._totalDamage;
      scenarioValues = replaceHeadersByDamages(damage, category, scenarioValues);
    })

    // Add scenario id to the returned array.
    const index = scenarioValues.indexOf(SCENARIO_ID_HEADER);
    scenarioValues[index] = scenario._id;

    return scenarioValues;
  });

  // Transform array to csv-like string.
  let csv = '';
  csv += headers.join(',');
  csv += '\n';

  csvData.forEach(scenario => {
    csv += Object.values(scenario).join(',');
    csv += '\n';
  });

  return csv;
}

module.exports = formatExportService;
