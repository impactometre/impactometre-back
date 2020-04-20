/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function submitMeeting () {
  const payload = { hardware: [], software: [], journey: [] }

  const form = $('#meetingForm').serializeJSON({
    parseNumbers: true
  })

  const { meetingDuration, numberOfParticipants, softwareChoice, journeys } = form

  Object.keys(form.hardware).forEach(key => {
    if (key === 'tvs') {
      Object.values(form.hardware[key]).forEach(tv => {
        const size = (tv.unit === 'inch')
          ? areaFromDiagonal(inchesToCm(tv.value))
          : areaFromDiagonal(tv.value)

        payload.hardware.push({ name: 'TV_SCREEN_ONE_METER_SQUARE', size })
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

  if (journeys !== undefined) {
    const filteredJourneys = Object.values(journeys).filter(journey => journey.distance > 0)
    payload.journey = filteredJourneys
  }

  const data = { meetingDuration, numberOfParticipants, payload }

  $.post('creer', { payload: JSON.stringify(data) }).done(data => {
    window.location.href = data.redirect
  })
}
