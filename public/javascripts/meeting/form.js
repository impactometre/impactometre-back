/* eslint no-unused-vars: 0 */

function cmToInches (i) {
  return Math.round(i * 0.39370)
}

function inchesToCm (i) {
  return Math.round(i / 0.39370)
}

function getIdNumber (id) {
  // Return the number n for a string ending with -n
  const idNumberFilter = /\w+-(\d{1,2})/
  var idNumber = id.replace(idNumberFilter, '$1')

  return idNumber
}

function outputUpdate (size, id) {
  document.querySelector('#screenSizeNumberInput-' + getIdNumber(id)).value = size
}

function rangeUpdate (size, id) {
  document.querySelector('#tvScreenSize-' + getIdNumber(id)).value = size
}

var tvScreenNumber = 0
const tvScreenMaxNumber = 50
const tvScreenMinNumber = 0

function updateTvScreenNumberSpan (number) {
  document.querySelector('#tvScreenNumber').innerHTML = number
}

function addATvScreen () {
  if (tvScreenNumber < tvScreenMaxNumber) {
    tvScreenNumber += 1
    updateTvScreenNumberSpan(tvScreenNumber)

    var parent = document.querySelector('#additionalScreens')
    var div = document.createElement('div')

    if (tvScreenNumber === 1) {
      div.innerHTML = '<label for="tvScreenSize-' + tvScreenNumber + '">taille du ' + tvScreenNumber + '<sup>er</sup> écran</label>'
    } else {
      div.innerHTML = '<label for="tvScreenSize-' + tvScreenNumber + '">taille du ' + tvScreenNumber + '<sup>e</sup> écran</label>'
    }

    div.innerHTML += '<input type="range" min="48" max="228" value="107" id="tvScreenSize-' + tvScreenNumber + '"' +
    'oninput="outputUpdate(value, id)">' +
    '<output for="tvScreenSize-' + tvScreenNumber + '" id="screenSize-' + tvScreenNumber + '">' +
    '<input type="number" min="48" max="228" value="107" id="screenSizeNumberInput-' + tvScreenNumber + '"' +
    'oninput="rangeUpdate(value, id)">' +
    '</output>' +
    '<select id="screenSizeUnit-' + tvScreenNumber + '" name="unit"' +
    'onchange="changeScreenUnit(value, id)">' +
    '<option value="cm" id="cm" selected>centimètres</option>' +
    '<option value="inch" id="inch">pouces</option>' +
    '</select>'
    parent.appendChild(div)
  }
}

function removeATvScreen () {
  if (tvScreenNumber > tvScreenMinNumber) {
    tvScreenNumber -= 1
    updateTvScreenNumberSpan(tvScreenNumber)

    var parent = document.querySelector('#additionalScreens')
    console.log(parent.lastChild.nodeName)
    parent.removeChild(parent.lastChild)
  }
}

function changeScreenUnit (unit, id) {
  const screenSizesCm = new Map([
    ['min', 43],
    ['value', 107],
    ['max', 228]
  ])
  const cmIterator = screenSizesCm.entries()

  const screenSizesInch = new Map([
    ['min', 17],
    ['value', 42],
    ['max', 90]
  ])
  const inchIterator = screenSizesInch.entries()

  const n = getIdNumber(id)

  const tvScreenSizeSelector = document.querySelector('#tvScreenSize-' + n)
  const screenSizeNumberInputSelector = document.querySelector('#screenSizeNumberInput-' + n)

  if (unit === 'cm') {
    tvScreenSizeSelector.value = inchesToCm(tvScreenSizeSelector.value)
    screenSizeNumberInputSelector.value = inchesToCm(screenSizeNumberInputSelector.value)
    for (const [key, value] of cmIterator) {
      tvScreenSizeSelector.setAttribute(key, value)
      screenSizeNumberInputSelector.setAttribute(key, value)
    }
  } else {
    console.log(screenSizesInch.get('value'))
    tvScreenSizeSelector.value = cmToInches(tvScreenSizeSelector.value)
    screenSizeNumberInputSelector.value = cmToInches(screenSizeNumberInputSelector.value)
    for (const [key, value] of inchIterator) {
      tvScreenSizeSelector.setAttribute(key, value)
      screenSizeNumberInputSelector.setAttribute(key, value)
    }
  }
}
