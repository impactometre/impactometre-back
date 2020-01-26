'use strict'

const hourToMinutes = 60
const dayToHours = 24
const minuteToSeconds = 60

const octetToBits = 8
const moToOctets = 1000000
const kbitToBits = 1000

/**
 * Number of days worked by year.
 * Source : https://www.dougs.fr/blog/quel-est-le-nombre-de-jours-travailles-en-2020/
 */
const daysWorkedByYear = 230
const workedDaysByWeek = 5

/**
 * Bounds used for getting upper or lower equipment
 * damage values depending on what the user wants.
 */
const bounds = {
  UPPER: 'upper',
  LOWER: 'lower'
}

// See https://gitlab.utc.fr/tx-techno-num/impactometre/wikis/R%C3%A9union/Pr%C3%A9cisions-sur-le-sens-des-diff%C3%A9rents-impacts
const hardwareDamageTypes = {
  // Embodied damage attributed to visio time
  EMBODIED_VISIO: 'embodiedVisio',
  // Embodied damage attributed to standby time
  EMBODIED_STANDBY: 'embodiedStandby',
  // Constant we use when we only need to get the embodied damage value
  EMBODIED: 'embodied',
  // Operating damage attributed to visio time
  OPERATING_VISIO: 'operatingOneMinVisio',
  // Operating damage attributed to standby time
  OPERATING_STANDBY: 'operatingOneMinStandby'
}

/**
 * Used hardwares lifetime. The values below are also the
 * ones used for the other hardwares.
 */
const hardwareLifetime = {
  DESKTOP: 5,
  POWER_CABLE_ONE_METER: 20
}

/**
 * Hardwares operating time already known, so that
 * don't need to be computed.
 */
const knownOperatingTimeOverLife = {
  TV_SCREEN_BASE: 50000,
  TV_SCREEN: 50000
}

/**
 * Used hardwares operating time per day.
 */
const hardwareOperatingTimePerDay = {
  NOT_VISIO_DEDICATED: 7,
  // Considering it is used 3 hours per week
  VISIO_DEDICATED: 3 / workedDaysByWeek
}

/**
 * Components that a meeting can be composed of.
 */
const meetingComponents = {
  HARDWARE: 'HARDWARE',
  SOFTWARE: 'SOFTWARE',
  JOURNEY: 'JOURNEY'
}

/**
 * Transportation mean sub categories
 */
const transportationMeanSubCategories = {
  CAR: 'CAR',
  PLANE: 'PLANE',
  TRAIN: 'TRAIN',
  BUS: 'BUS',
  BIKE: 'BIKE'
}

/**
 * Damage categories for meetings
 */
const meetingCategoryDamage = {
  HARDWARE: 'HARDWARE',
  SOFTWARE: 'SOFTWARE',
  JOURNEY: 'JOURNEY'
}

const possibleJourneys = [
  { distance: 50, mean: 'TRAIN_REGIONAL_ONE_PERSON_KM', numberOfPeople: 1 },
  { distance: 6, mean: 'BUS_CITY_ONE_PERSON_KM', numberOfPeople: 1 },
  { distance: 10, mean: 'CAR_ELECTRIC_ONE_KM', numberOfPeople: 4 }
]

const damageEndpoints = {
  HUMAN_HEALTH: 'HUMAN_HEALTH',
  ECOSYSTEM_QUALITY: 'ECOSYSTEM_QUALITY',
  CLIMATE_CHANGE: 'CLIMATE_CHANGE',
  RESOURCES: 'RESOURCES'
}

exports.hourToMinutes = hourToMinutes
exports.dayToHours = dayToHours
exports.minuteToSeconds = minuteToSeconds

exports.octetToBits = octetToBits
exports.moToOctets = moToOctets
exports.kbitToBits = kbitToBits

exports.daysWorkedByYear = daysWorkedByYear
exports.workedDaysByWeek = workedDaysByWeek

exports.bounds = bounds
exports.hardwareDamageTypes = hardwareDamageTypes
exports.hardwareLifetime = hardwareLifetime
exports.knownOperatingTimeOverLife = knownOperatingTimeOverLife
exports.hardwareOperatingTimePerDay = hardwareOperatingTimePerDay

exports.meetingComponents = meetingComponents
exports.transportationMeanSubCategories = transportationMeanSubCategories
exports.meetingCategoryDamage = meetingCategoryDamage

exports.possibleJourneys = possibleJourneys

exports.damageEndpoints = damageEndpoints
