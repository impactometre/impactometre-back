/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function switchVue () {
  if (document.getElementById('monoDiv').hidden === false) {
    let ctx = document.getElementById('humanHealth').getContext('2d');
    stackedBarChart(ctx, 'HUMAN_HEALTH');
    ctx = document.getElementById('climateChange').getContext('2d');
    stackedBarChart(ctx, 'CLIMATE_CHANGE');
    ctx = document.getElementById('resources').getContext('2d');
    stackedBarChart(ctx, 'RESOURCES');
    ctx = document.getElementById('ecosystemQuality').getContext('2d');
    stackedBarChart(ctx, 'ECOSYSTEM_QUALITY');

    document.getElementById('monoDiv').hidden = true;
    document.getElementById('humanHealthChart').hidden = false;
    document.getElementById('climateChangeChart').hidden = false;
    document.getElementById('resourcesChart').hidden = false;
    document.getElementById('ecosystemQualityChart').hidden = false;

    document.getElementById('switchVue').firstChild.data = 'Revenir aux impacts résumés';
  } else {
    const ctx = document.getElementById('monoChart').getContext('2d');
    barChart(ctx);

    document.getElementById('monoDiv').hidden = false;
    document.getElementById('humanHealthChart').hidden = true;
    document.getElementById('climateChangeChart').hidden = true;
    document.getElementById('resourcesChart').hidden = true;
    document.getElementById('ecosystemQualityChart').hidden = true;

    document.getElementById('switchVue').firstChild.data = 'Voir les impacts détaillés';
  }
}
