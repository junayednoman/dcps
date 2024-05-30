const setArrayFieldValue = (valuesArray, formArray, fetchedArray) => {
  valuesArray.forEach((dev, idx) => {
    // Use forEach instead of map for side effects
    let isEmpty = Object.keys(dev).length === 0;

    if (isEmpty) {
      // Directly assign fetchedArray to formArray by reference
      formArray[idx] = fetchedArray[idx];
    } else {
      const fetchedData = fetchedArray[idx];
      for (const key in fetchedData) {
        if (Object.hasOwnProperty.call(fetchedData, key)) {
          if (dev[key] === undefined) {
            dev[key] = fetchedData[key];
          }
        }
      }
    }
  });
};

export default setArrayFieldValue;
