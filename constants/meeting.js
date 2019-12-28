'use strict'

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

/* Five days worked by week */
const workedDaysByWeek = 5

/**
 * Used hardwares operating time per day.
 */
const hardwareOperatingTimePerDay = {
  DESKTOP: 7,
  // Considering it is used 3 hours per week
  LOGITECH_KIT: 3 / workedDaysByWeek
}

/**
 * Hardwares operating time already known, so that
 * don't need to be computed.
 */
const knownHardwareOperatingTime = {
  TV_SCREEN_BASE: 50000,
  TV_SCREEN: 50000
}

/**
 * Hardwares standby time already known, so that
 * don't need to be computed.
 */
const knownHardwareStandbyTime = {}

/**
 * Number of days worked by year.
 * Source : https://www.dougs.fr/blog/quel-est-le-nombre-de-jours-travailles-en-2020/
 */
const daysWorkedByYear = 230

/**
 * Number of hours in a day
 */
const hoursByDay = 24

exports.software = software
exports.hardware = hardware
exports.hardwareLifetime = hardwareLifetime
exports.hardwareOperatingTimePerDay = hardwareOperatingTimePerDay
exports.transportationMeans = transportationMeans
exports.workedDaysByWeek = workedDaysByWeek
exports.knownHardwareOperatingTime = knownHardwareOperatingTime
exports.knownHardwareStandbyTime = knownHardwareStandbyTime
exports.daysWorkedByYear = daysWorkedByYear
exports.hoursByDay = hoursByDay
