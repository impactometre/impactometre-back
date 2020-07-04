'use strict';

const Scenario = require('../shared/Scenario');
const MeetingDamage = require('./MeetingDamage');
const hardwareDatabase = require('../../../database/meeting/hardware');
const softwareDatabase = require('../../../database/meeting/software');
const transportDatabase = require('../../../database/meeting/transportationMean');
const meetingScenarios = require('../../../database/meeting/meetingScenarios');
const {
  meetingCategoryDamage,
  bounds,
  possibleJourneys,
  modificationTypes
} = require('../../../constants/meeting');

class MeetingScenario extends Scenario {
  /**
   * Create a scenario corresponding to a meeting.
   * @param {String} user - The user who creates the scenario.
   * @param {Number} meetingDuration - The scenario duration in minutes.
   * @param {Object} payload - A JSON object that contains three arrays that enable to create the three
   * category damages (hardware, software, transport) linked to the meeting. The payload is like:
   * { [array_of_all_hardware_data], [array_of_all_software_data], [array_of_all_journey data]}.
   * @see MeetingDamage
   * @see CategoryDamage
   */
  constructor ({ meetingScenario, meetingDuration, numberOfParticipants, hardware, software, journey }) {
    super(meetingScenario);
    this._meetingDuration = meetingDuration;
    this._numberOfParticipants = numberOfParticipants;

    const formattedSoftwarePayload = [];
    switch (software.name.toUpperCase()) {
      case '':
        break;
      case 'OTHER':
        formattedSoftwarePayload.push({ name: 'SKYPE' });
        break;
      default:
        formattedSoftwarePayload.push({ name: software.name });
    }

    this._damage = new MeetingDamage(hardware, formattedSoftwarePayload, journey);
  }

  // Getters

  /**
   * Getter of the user who creates the meeting scenario.
   */
  get user () {
    return this._user;
  }

  /**
   * Getter of the meeting duration in minutes.
   */
  get meetingDuration () {
    return this._meetingDuration;
  }

  /**
   * Getter of the MeetingDamage object linked to the meeting scenario.
   * @see MeetingDamage
   */
  get damage () {
    return this._damage;
  }

  get numberOfParticipants () {
    return this._numberOfParticipants;
  }

  // Setters

  /**
   * Setter of the user who creates the meeting scenario.
   */
  set user (user) {
    this._user = user;
  }

  /**
   * Setter of the meeting duration in minutes.
   */
  set meetingDuration (meetingDuration) {
    this._meetingDuration = meetingDuration;
  }

  /**
   * Setter of the MeetingDamage object linked to the meeting scenario.
   * @see MeetingDamage
   */
  set damage (damage) {
    this._damage = damage;
  }

  set numberOfParticipants (numberOfParticipants) {
    this._numberOfParticipants = numberOfParticipants;
  }

  // Other methods

  /**
   * Compute the damage caused by all the meeting components (hardware , software and journeys)
   * Call computeDamage() methods of the MeetingDamage object linked to the MeetingScenario object.
   * @param damagePayload - A JSON object send by front end that contains all necessary data to compute
   * the damage caused by the meeting.
   * @see MeetingDamage
   */
  async computeDamage (damagePayload) {
    const ret = await this.damage.computeDamage(damagePayload);
    return Promise.resolve(ret);
  }

  /**
   * Generate alternatives scenarios based on this MeetingScenario.
   * @returns An array that contains alternative MeetingScenarios.
   */
  generateAlternatives () {
    const numberOfParticipants = this.numberOfParticipants;
    const user = this.user;
    const meetingDuration = this.meetingDuration;

    // **** Generate first alternative scenario: heavy visio
    // Generate hardware components
    // - 1/3 of used hardware is heavy visio system
    // - 2/3 are light hardware, i.e. desktops with cameras and microphones
    const heavyHardwareNumber = Math.ceil(numberOfParticipants / 3);
    const lightHardwareNumber = numberOfParticipants - heavyHardwareNumber;
    let hardwareComponents = [];
    const heavyHardwareComponent = [
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.LOGITECH_KIT.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.TV.name },
      { name: hardwareDatabase.METAL_STRUCTURE.name }
    ];
    const lightHardwareComponent = [
      { name: hardwareDatabase.DESKTOP.name },
      { name: hardwareDatabase.CAMERA.name },
      { name: hardwareDatabase.MICROPHONE.name }
    ];
    // Add the ritght number of heavy visio systems used for the meeting
    for (let i = 0; i < heavyHardwareNumber; i++) {
      hardwareComponents = hardwareComponents.concat(heavyHardwareComponent);
    }
    // Add the right number of light visio systems used for the meeting
    for (let i = 0; i < lightHardwareNumber; i++) {
      hardwareComponents = hardwareComponents.concat(lightHardwareComponent);
    }
    // Generate software component
    let softwareComponents = [{ name: softwareDatabase.SKYPE.name }];
    // Generate journey components
    // - 1/5 of the particpants take the city bus
    const journeyNumber = Math.ceil(numberOfParticipants / 5);
    let journeyComponents = [{
      passenger: 'Meeting passengers',
      mean: transportDatabase.BUS_CITY_ONE_PERSON_KM.name,
      distance: 5,
      numberOfPeople: journeyNumber
    }];
    // Concatenate all meeting component to create the payload used to initilise the first alternative MeetingScenario
    const heavyVisioPayload = {
      [meetingCategoryDamage.HARDWARE]: hardwareComponents,
      [meetingCategoryDamage.SOFTWARE]: softwareComponents,
      [meetingCategoryDamage.JOURNEY]: journeyComponents
    };
    // Generate the MeetingScenario and add it the database
    const heavyVisioScenario = MeetingScenario.create({ user, name: 'Alternative visio lourde', meetingDuration, numberOfParticipants, payload: heavyVisioPayload });

    // Compute its damage
    const DamagePayload = {
      [meetingCategoryDamage.HARDWARE]: { meetingDuration, bound: bounds.UPPER },
      [meetingCategoryDamage.SOFTWARE]: { instancesNumber: numberOfParticipants, bandwithBound: bounds.UPPER, networkBound: bounds.UPPER, meetingDuration },
      [meetingCategoryDamage.JOURNEY]: {}
    };
    heavyVisioScenario.computeDamage(DamagePayload);

    // **** Generate the secound alternative scenario: light transport
    // Generate hardware components
    hardwareComponents = [];
    const laptop = [{ name: hardwareDatabase.LAPTOP.name }];
    // 2/3 of particpants have a laptop
    for (let i = 0; i < Math.ceil(numberOfParticipants * (2 / 3)); i++) {
      hardwareComponents = hardwareComponents.concat(laptop);
    }
    // Generate software components (no software compoents for this alternative scenario)
    softwareComponents = [{ name: softwareDatabase.SKYPE.name }];
    // Generate journey components
    // Initialise meeting journey components
    journeyComponents = [];

    /* We considered a mean journey for one person has
     - 50 km by train
     - 5 km by city bus
     - 10 km by electric car shared with 3 other people.
     If 4 people participate in the meeting
     - 200 (50 * 4) km are done by train
     - 20 (5 * 4) are done by city bus
     - 40 (10 * 4) ra done by electric car.
     By ease for users, we choose to spread these journeys over meeting particpants. Instead of
     having 4 times the same journey, we consided that Participant 1 do on journey of 150 km by train,
     Participant 2 do one journey of 15 km by city bus, Participant 3 do one journey of 30 km by electric car.
     We considered the last participant do 3 journeys (50 km by train, 5 km by city bus, 10 km by electric car)
    */

    // Initialise the journey counter needed for the loop (from 0 to possibleJouneys.lenght)
    let journeyCounter = 0;

    // Compute the factor by wich we multiply the distance done by each participant
    // For each possible journey, the total distance (done by all meeting participants)
    // done is numberOfParticpants * possibleJourneys[i].distance
    const computeDistanceFactor = (numberOfParticipants < possibleJourneys.length)
      ? numberOfParticipants
      : possibleJourneys.length;

    for (let i = 0; i < numberOfParticipants; i++) {
      const journey = [{
        passenger: 'Participant ' + (i + 1),
        mean: possibleJourneys[journeyCounter].mean,
        distance: possibleJourneys[journeyCounter].distance * computeDistanceFactor,
        numberOfPeople: possibleJourneys[journeyCounter].numberOfPeople
      }];
      // Add the created journey to meeting journey components
      journeyComponents = journeyComponents.concat(journey);

      // If the last possible journey is reached, go back to the first one
      if (journeyCounter === possibleJourneys.length - 1) {
        journeyCounter = 0;
      } else {
        // If the last participant is reached, but not the last possible
        // don't increase partcipant counter (i.e. i) in order to give all not reached possible
        // journeys to the last participant (see explanations above the loop)
        if (i === numberOfParticipants - 1 && journeyCounter !== possibleJourneys.lengt - 1) {
          i--;
        }
        journeyCounter++;
      }
    }
    // Create the payload
    const lightTransportPayload = {
      [meetingCategoryDamage.HARDWARE]: hardwareComponents,
      [meetingCategoryDamage.SOFTWARE]: softwareComponents,
      [meetingCategoryDamage.JOURNEY]: journeyComponents
    };
    // Generate meeting scenario
    const lightTransportScenario = MeetingScenario.create({ user, name: 'Alternative transports légers', meetingDuration, numberOfParticipants, payload: lightTransportPayload });
    // Compute its damage
    lightTransportScenario.computeDamage(DamagePayload);
  }

  /**
 * Create a scenario corresponding to a meeting and add it to the database.
 * @param {String} user - The user who creates the scenario.
 * @param {Number} meetingDuration - The scenario duration in minutes.
 * @param {Number} numberOfParticipants - The number of people who participates in the meeting.
 * @param {Object} payload - A JSON object that contains three arrays that enable to create the three
 * category damages (hardware, software, transport) linked to the meeting. The payload is like:
 * { [array_of_all_hardware_data], [array_of_all_software_data], [array_of_all_journey data]}.
 * @returns {MeetingScenario} The created meetingScenario.
 */
  static create ({ user = '', name = '', meetingDuration, numberOfParticipants, payload }) {
  // Create new MeetingScenario
    const meetingScenario = new MeetingScenario({ user, name, meetingDuration, numberOfParticipants, payload });

    // Return the created meetingScenario
    return meetingScenario;
  }

  /**
 * Read a non-writable meeting scenario.
 * @param {String} id - The id of the meeting scenario we want to return.
 * @returns {MeetingScenario} The meeting scenario we want to return.
 */
  static read (id) {
    const meetingScenario = meetingScenarios.get(id);
    if (meetingScenario !== undefined) {
      return meetingScenario;
    } else {
      throw new Error('Required MeetingScenario not available in database.');
    }
  }

  /**
 * Delete a meeting scenario from the database.
 * @param {String} id - The id of the meeting scenario we want to delete.
 * @returns {Boolean} True if deletion succeeds, false if not.
 */
  static remove (id) {
    return meetingScenarios.delete(id);
  }

  /**
   * Update a meeting scenario.
   * Enable to update all meeting scenario object attributes, several or only one.
   * @param {Number} meetingDuration - The new meeting duration in minutes.
   * @param {Object} payload - A JSON object that enables update all meeting scenario object attributes, several or only one.
   * @see MeetingDamage
   */
  modify ({ meetingDuration, numberOfParticipants, payload, damagePayload }) {
    let shouldBeRecomputed = false;

    // Update if there is a new meeting duration
    if (meetingDuration && this.meetingDuration !== meetingDuration) {
      this.meetingDuration = meetingDuration;
      shouldBeRecomputed = true;
    }

    // Update if there is a new number of participants
    if (numberOfParticipants && this.numberOfParticipants !== numberOfParticipants) {
      this.numberOfParticipants = numberOfParticipants;
      shouldBeRecomputed = true;
    }

    // if there is a modification on meeting components (hardwares, softwares, journeys)
    // All damages are recompute
    if (payload && payload !== {}) {
      // Get the modified component category damage (hardware, software or journey)
      const categoryDamage = payload.categoryDamage;

      switch (payload.modificationType) {
        case modificationTypes.UPDATE:
          this.update({ id: payload.id, categoryDamage, payload: payload.data });
          break;
        case modificationTypes.CREATE:
          throw new Error('Not implemented yet.');
        case modificationTypes.REMOVE:
          throw new Error('Not implemented yet.');
      }
    }

    // If all meeting damages should be recompted
    if (shouldBeRecomputed) {
      if (!damagePayload || damagePayload === {}) {
        throw new Error('You should provide the necessary data to update meeting damage values.');
      }
      this.computeDamage(damagePayload);
    }
  }

  /**
   * Update caracteristc and damage value of a meeting component (hardware, software, journey).
   * @param {Object} data - All necessary data to update a meeting component.
   * @param {String} data.id - The id of the meeting component we want update.
   * @param {String} data.categoryDamage - The category of the meeting component we want update (i.e. hardware, software or journey)
   * @param {Object} data.payload - A JSON object that contains all necessary data update caracteristic and damage value of the meeting component.
   */
  update ({ id, categoryDamage, payload }) {
    // oOld component damage value
    let oldDamage;
    // Updated component damage value
    let updatedDamage;
    // Total damage value of updated component category
    let totalCategoryDamage;
    // Old damage value of updated component category
    let odlTotalCategoryDamage;

    switch (categoryDamage) {
      case meetingCategoryDamage.HARDWARE: {
        const hardwareToUpdate = this.damage.hardwareDamage.components.get(id);
        oldDamage = hardwareToUpdate.damage;
        hardwareToUpdate.update(payload);
        updatedDamage = hardwareToUpdate.damage;

        // update hardware category total damage value
        odlTotalCategoryDamage = this.damage.hardwareDamage.totalDamage;
        totalCategoryDamage = this.damage.hardwareDamage.totalDamage;
        totalCategoryDamage = totalCategoryDamage.minus(oldDamage);
        totalCategoryDamage = totalCategoryDamage.add(updatedDamage);
        this.damage.hardwareDamage.totalDamage = totalCategoryDamage;
        break;
      }
      case meetingCategoryDamage.SOFTWARE: {
        const softwareToUpdate = this.damage.softwareDamage.components.get(id);
        oldDamage = softwareToUpdate.damage;
        softwareToUpdate.update(payload);
        updatedDamage = softwareToUpdate.damage;

        // update software category total damage value
        odlTotalCategoryDamage = this.damage.softwareDamage.totalDamage;
        totalCategoryDamage = this.damage.softwareDamage.totalDamage;
        totalCategoryDamage = totalCategoryDamage.minus(oldDamage);
        totalCategoryDamage = totalCategoryDamage.add(updatedDamage);
        this.damage.softwareDamage.totalDamage = totalCategoryDamage;
        break;
      }
      case meetingCategoryDamage.JOURNEY: {
        const journeyToUpdate = this.damage.journeyDamage.components.get(id);
        oldDamage = journeyToUpdate.damage;
        journeyToUpdate.update(payload);
        updatedDamage = journeyToUpdate.damage;

        // update journey category total damage value
        odlTotalCategoryDamage = this.damage.journeyDamage.totalDamage;
        totalCategoryDamage = this.damage.journeyDamage.totalDamage;
        totalCategoryDamage = totalCategoryDamage.minus(oldDamage);
        totalCategoryDamage = totalCategoryDamage.add(updatedDamage);
        this.damage.journeyDamage.totalDamage = totalCategoryDamage;
        break;
      }
    }

    // Substract old total damage value of updated component category from meeting total damage value
    this.damage.totalDamage = this.damage.totalDamage.minus(odlTotalCategoryDamage);

    // Add the new total damage value of updated component category to meeting total damage value
    this.damage.totalDamage = this.damage.totalDamage.add(totalCategoryDamage);
  }
}

module.exports = MeetingScenario;
