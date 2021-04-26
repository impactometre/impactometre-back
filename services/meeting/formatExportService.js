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

const formatDamage = (rawDamage, scenariosValues, category) => {
  Object.entries(rawDamage).forEach(([sphere, damageValue]) => {      
    const index = scenariosValues.indexOf(`${sphere.replace('_', '')}${category}`);
    scenariosValues[index] = damageValue;
  })

  return scenariosValues;
}

const formatExportService = (computedScenarios) => {

  const headers = getHeaders(computedScenarios);

  const csvData = computedScenarios.map(scenario => {    
    let scenarioValues = JSON.parse(JSON.stringify(headers));

    Object.entries(scenario._damage).forEach(([category, data]) => {
      if (category === '_totalDamage') {
        scenarioValues = formatDamage(data, scenarioValues, category);

        return;
      }
      
      const damage = data._totalDamage;
      scenarioValues = formatDamage(damage, scenarioValues, category);
    })

    const index = scenarioValues.indexOf(SCENARIO_ID_HEADER);
    scenarioValues[index] = scenario._id;

    return scenarioValues;
  });
  
  getHeaders(computedScenarios);

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
