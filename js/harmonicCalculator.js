// Harmonic Calculator by Jesse Pollock
// Calculate a specified number of harmonics for a given fundamental frequency
// Calculate the musical note and its frequency that is closest to the input

// validate the frequency entered
const frequencyValidator = (frequency) => {
  if (isNaN(frequency) || frequency < 20 || frequency > 10000) {
    return false;
  } else {
    return true;
  }
}

// validate the number of harmonics entered
const harmonicAmountValidator = (amountOfHarmonics) => {
  if (isNaN(amountOfHarmonics) || amountOfHarmonics < 1 || amountOfHarmonics > 100) {
    return false;
  } else {
    return true;
  }
}

// calculate harmonics and store them in an array
const harmonicCalc = (fundamentalFreq, numberOfHarmonics) => {
  const harmonicArray = [];
  let harmonicFreq = 0;
  for (i = 2; i <= numberOfHarmonics + 1 && fundamentalFreq * i <= 20000 ; i += 1) {
    harmonicFreq = parseFloat((fundamentalFreq * i).toFixed(3));
    harmonicArray.push(harmonicFreq);
    }
    return harmonicArray;
  }

// create visual display of harmonics
const harmonicDisplay = (list) => {
  let harmonicDisplayString = '';
  harmonicDisplayString += '<h3>Fundamental Frequency: ' + 
                            (list[0] / 2) + ' Hz</h3>\n' +
                            '<a id="reset-button" href="harmonic-calculator.html">Reset</a><br>';
  for (i = 0; i < list.length; i++) {
    harmonicDisplayString += 'Harmonic ' + (i + 2) + ': ' + list[i] + ' Hz<br>';
  }
  return harmonicDisplayString;
}

// find the closest musical note to the frequency input
const compareFrequency = (frequencyInput, frequencyArray, noteArray) => {
  let isGreaterThan = true;
  let indexLower = 0;
  let indexUpper = 0;
  let lowerDifference = 0;
  let upperDifference = 0;
  let noteComparisonMessage = 'Closest musical note: ';

  while (isGreaterThan) {
    if (frequencyInput >= frequencyArray[indexUpper]) {
      indexUpper += 1;
    } else {
      isGreaterThan = false;
      indexLower = indexUpper - 1;
      lowerDifference = frequencyInput - frequencyArray[indexLower];
      upperDifference = frequencyArray[indexUpper] - frequencyInput;

      // create note comparison message
      if (frequencyInput === frequencyArray[indexLower]) {
        noteComparisonMessage = 'Musical Note: ' + noteArray[indexLower] +
                                ' (' + frequencyArray[indexLower] + ' Hz)';
      } else if (lowerDifference < upperDifference) {
        noteComparisonMessage += noteArray[indexLower] +
                                ' (' + frequencyArray[indexLower] + ' Hz)';
      } else {
        noteComparisonMessage += noteArray[indexUpper] +
                                ' (' + frequencyArray[indexUpper] + ' Hz)';
      }
    }
  }
  return noteComparisonMessage;
}

// connect html form
let form = document.getElementById('harmonic_calculator_form');

form.addEventListener('submit', function(event){
  // variables
  let freqIn = 0;
  const frequencyValidatorMessage ='Your entry is invalid. Please enter a ' +
                                 'frequency from 20Hz to 10,000Hz.';
  let harmonicAmount;
  const harmonicValidatorMessage ='Your entry is invalid. Please enter a ' + 
                                'number of harmonics from 1-100';
  let outputArea;
  let outputClosestNote;
  let outputHarmonics;
  let userHarmonicArray;

  event.preventDefault();

  // get user input
  freqIn = document.getElementById('fundamentalFrequency');
  harmonicAmount = document.getElementById('numberOfHarmonics');

  // convert user input to numbers
  freqIn = Number(freqIn.value);
  harmonicAmount = Number(harmonicAmount.value);

  // validate user inputs and calculate harmonics if valid
    if (frequencyValidator(freqIn) === false) {
        alert(frequencyValidatorMessage);
    } else if (harmonicAmountValidator(harmonicAmount) === false) {
        alert(harmonicValidatorMessage);
    } else {
      userHarmonicArray = harmonicCalc(freqIn, harmonicAmount);
    }
  
  // find closet musical note
  outputClosestNote = compareFrequency(freqIn, musicalNotesFrequencies, musicalNotes);

  // output
  outputHarmonics = '<h3>' + outputClosestNote + '</h3>' + 
                    harmonicDisplay(userHarmonicArray);

  // fetch output area and place the message into the output area
  outputArea = document.getElementById('output');
  outputArea.innerHTML = outputHarmonics;
});
