// Function to convert English number to Bengali number
const convertToBengaliNumber = (englishNumber) => {
    const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
    return englishNumber
      .toString()
      .split('')
      .map((digit) => bengaliNumbers[parseInt(digit)])
      .join('');
  };
  
  export default convertToBengaliNumber;