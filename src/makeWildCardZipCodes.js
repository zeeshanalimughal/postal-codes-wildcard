export const makeWildCardZipCodes = (code) => {
  const postalCode = code.trim().replace(" ", "").toUpperCase();

  const threeWordsPostalCodeRegex = /^([A-Z][0-9][A-Z])$/;
  const fourWordsPostalCodeRegex = /^([A-Z][0-9][A-Z])([0-9])$/;
  const fiveWordsPostalCodeRegex = /^([A-Z][0-9][A-Z])([0-9][A-Z])$/;
  const sixWordsPostalCodeRegex = /^([A-Z][0-9][A-Z])([0-9][A-Z][0-9])$/;
  if (postalCode.length < 3) return;

  const postalCodeArr = [];
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  if (postalCode.length === 3) {
    if (!threeWordsPostalCodeRegex.test(postalCode)) return;
    console.log("Ok", postalCode);
    for (let i = 0; i < alphabets.length; i++) {
      for (let j = 0; j < 10; j++) {
        for (let k = 0; k < alphabets.length; k++) {
          postalCodeArr.push(alphabets[i] + j + alphabets[k]);
        }
      }
    }
    return postalCodeArr;
  }
  if (postalCode.length === 4) {
    if (!fourWordsPostalCodeRegex.test(postalCode)) return;
    const enteredValue = parseInt(postalCode[3]);
    for (let i = enteredValue; i < 10; i++) {
      for (let j = 0; j < alphabets.length; j++) {
        for (let k = 0; k < 10; k++) {
          postalCodeArr.push(i + alphabets[j] + k);
        }
      }
    }
    return postalCodeArr;
  }
  if (postalCode.length === 5) {
    if (!fiveWordsPostalCodeRegex.test(postalCode)) return;
    const enteredNumberValue = parseInt(postalCode[3]);
    const enteredAlphabetValue = postalCode[4];

    for (let i = enteredNumberValue; i < 10; i++) {
      for (let j = alphabets.indexOf(enteredAlphabetValue); j < alphabets.length; j++) {
        for (let k = 0; k < 10; k++) {
          postalCodeArr.push(i + alphabets[j] + k);
        }
      }
    }
    return postalCodeArr;
  }

  if (postalCode.length === 6) {
    if (!sixWordsPostalCodeRegex.test(postalCode)) return;
     const enteredNumberFirstValue = parseInt(postalCode[3]);
        const enteredAlphabetValue = postalCode[4];
        const enteredNumberLastValue = postalCode[5];
        for (let i = enteredNumberFirstValue; i < 10; i++) {
            for (let j = alphabets.indexOf(enteredAlphabetValue); j < alphabets.length; j++) {
              for (let k = enteredNumberLastValue; k < 10; k++) {
                postalCodeArr.push(i + alphabets[j] + k);
              }
            }
        }
        return postalCodeArr;
  }
};
