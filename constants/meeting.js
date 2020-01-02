'use strict'

const bitsInOctet = 8
const octetsInMo = 1000000
const secoundsInMinute = 60
const bitsInKbits = 1000

const networkEnergeticIntensityBound = {
  UPPER: 'upper',
  LOWER: 'lower'
}

const bandwidthBound = {
  MINIMUM: 'minimum',
  IDEAL: 'ideal'
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

exports.software = software
exports.hardware = hardware
exports.transportationMeans = transportationMeans
exports.networkEnergeticIntensityBound = networkEnergeticIntensityBound
exports.bandwidthBound = bandwidthBound
exports.bitsInOctet = bitsInOctet
exports.octetsInMo = octetsInMo
exports.secoundsInMinute = secoundsInMinute
exports.bitsInKbits = bitsInKbits
