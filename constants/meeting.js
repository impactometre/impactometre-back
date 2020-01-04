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
 * All software that users can use for meetings
 */
const software = {
  GOOGLE_HANGOUTS: 'google hangouts',
  JITSI: 'jisi',
  RENAVISO: 'renaviso',
  SKYPE: 'skype'
}

/**
 * All hardware devices that users can use for meetings.
 */
const hardware = {
  CAMERA: 'camera',
  COMPUTER_TOWER: 'computer tower',
  DESKTOP: 'desktop',
  DESKTOP_WITHOUT_SREEN: 'desktop without screen',
  DESKTOP_SCREEN_LCD: 'desktop screen LCD',
  ETHERNET_CABLE: 'ethernet cable',
  HDMI_CABLE: 'HDMI cable',
  INTERNET_ACCESS_EQUIPMENT: 'internet access equipment',
  JACK_CABLE: 'jack cable',
  LOGITECH_KIT: 'Logitech kit',
  METAL_STRUCTURE: 'metal structure',
  POWER_CABLE: 'power cable',
  PROJECTOR: 'projector',
  TV_SCREEN: 'TV screen',
  VGA_cable: 'VGA cable'
}

/**
 * All transportation means that users can use for meetings.
 */
const transportationMeans = {
  BIKE: 'bike',
  BUS_LARGE_DISTANCE: 'large distance bus',
  BUS_CITY: 'city bus',
  CAR_ELECTRIC_ENGINE: 'electric engine car',
  CAR_HEAT_ENGINE: 'heat engine car',
  PLANE_INTERCONTINENTAL: 'intercontinental plane',
  PLANE_INTRACONTINENTAL: 'intracontinental plane',
  TRAIN_HIGH_SPEED: 'high speed train',
  TRAIN_REGIONAL: 'regional train',
  TRAIN_URBAN: 'urban train',
  TRAMWAY: 'tramway'
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
  DESKTOP: 7,
  // Considering it is used 3 hours per week
  LOGITECH_KIT: 3 / workedDaysByWeek
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
