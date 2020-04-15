/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

const color = Chart.helpers.color

window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
}

const colors = [
  color(window.chartColors.red).alpha(0.5).rgbString(),
  color(window.chartColors.orange).alpha(0.5).rgbString(),
  color(window.chartColors.yellow).alpha(0.5).rgbString(),
  color(window.chartColors.green).alpha(0.5).rgbString(),
  color(window.chartColors.blue).alpha(0.5).rgbString(),
  color(window.chartColors.purple).alpha(0.5).rgbString(),
  color(window.chartColors.grey).alpha(0.5).rgbString()
]

const labelsMap = {
  RESOURCES: 'Ressources',
  CLIMATE_CHANGE: 'Changement climatique',
  ECOSYSTEM_QUALITY: 'Écosystèmes',
  HUMAN_HEALTH: 'Santé humaine'
}

const componentsCategoriesMap = {
  hardware: 'Hardware',
  software: 'Software',
  journey: 'Transport'
}

function barChart (ctx) {
  window.myBar = new Chart(ctx, {
    type: 'bar',
    data: barData(damages, scenarios),
    options: {
      responsive: true,
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Résultats'
      }
    }
  })
}

function stackedBarChart (ctx, category) {
  window.myBar = new Chart(ctx, {
    type: 'bar',
    data: stackedBarData(damages, scenarios, category),
    options: {
      title: {
        display: true,
        text: labelsMap[category]
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  })
}

function barData (damages, scenarios) {
  // Initialize chart data
  const chartData = {
    labels: [],
    datasets: []
  }

  // Initialize one dataset per scenario
  const datasets = {}
  let i = 0
  scenarios.forEach(scenario => {
    const index = i + 1
    datasets[scenario._id] = {
      label: scenario._name,
      backgroundColor: colors[i],
      borderColor: Object.values(window.chartColors)[i],
      data: []
    }

    i++
  })

  // Populate the datasets by category
  damages.forEach(categoryDamage => {
    // New category in chart labels
    chartData.labels.push(labelsMap[categoryDamage[0].damageEndpoint])

    // Get the value for each dataset
    categoryDamage.forEach(scenario => {
      datasets[scenario.meetingScenario].data.push(scenario.value)
    })
  })

  // Set the chart datasets to the populated datasets
  Object.values(datasets).forEach(dataset => chartData.datasets.push(dataset))

  return chartData
}

function stackedBarData (damages, scenarios, category) {
  // Initialize chart data
  const chartData = {
    labels: [],
    datasets: []
  }

  let i = 0
  const scenarioBarchartPosition = new Map()
  // Associate a scenario id and the position of its corresponding barchart
  // The fisrt label correspond to the first dataset, the second label to the second dataset, etc.
  scenarios.forEach(scenario => {
    chartData.labels.push(scenario._name)
    scenarioBarchartPosition.set(scenario._id, i)
    i++
  })

  // Initialize one dataset per component category
  const datasets = {}
  i = 0
  Object.keys(componentsCategoriesMap).forEach(category => {
    datasets[category] = {
      label: componentsCategoriesMap[category],
      backgroundColor: colors[colors.length - 1 - i],
      borderColor: Object.values(window.chartColors)[colors.length - 1 - i],
      data: []
    }

    i++
  })

  i = 0
  // Populate the datasets
  const categoryDamage = damages.filter(damageCategory => damageCategory[0].damageEndpoint === category)[0]
  Object.values(categoryDamage).forEach(damage => {
    // Get the right scenraio barchart position (thanks to the scenarioBarchartPosition )
    const actualScenario = scenarioBarchartPosition.get(damage.meetingScenario)
    Object.keys(componentsCategoriesMap).forEach(componentCategory => {
      datasets[componentCategory].data[actualScenario] = damage[componentCategory]
    })
  })

  // Set the chart datasets to the populated datasets
  Object.values(datasets).forEach(dataset => chartData.datasets.push(dataset))

  return chartData
}
