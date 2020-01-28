/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function submitMeeting () {
  let payload = { hardware: [], software: [], journey: [] }

  const form = $('#meetingForm').serializeJSON({
    parseNumbers: true
  })

  const { meetingDuration, numberOfParticipants, softwareChoice, journeys } = form

  payload = { ...payload, meetingDuration, numberOfParticipants }

  Object.keys(form.hardware).forEach(key => {
    if (key === 'tvs') {
      Object.values(form.hardware[key]).forEach(tv => {
        const size = (tv.unit === 'inch')
          ? inchesToCm(tv.value)
          : tv.value

        payload.hardware.push({ name: 'TV_SCREEN', size })
      })
    } else {
      for (let i = 0; i < form.hardware[key]; i++) {
        payload.hardware.push({ name: key })
      }
    }
  })

  if (softwareChoice === 'other') {
    payload.software.push({ name: 'SKYPE' })
  } else if (softwareChoice !== 'noSoftware') {
    payload.software.push({ name: softwareChoice })
  }

  const filteredJourneys = Object.values(journeys).filter(journey => journey.distance > 0)
  payload.journey = filteredJourneys
}
