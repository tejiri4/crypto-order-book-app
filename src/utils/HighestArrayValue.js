const HighestArrayValue = (object, key) => {
  const formattedArr = hasOwnProperty.call(object, key) ? object[key] : [];
  let maxArrayValuePair = formattedArr.length ? formattedArr[0] : [0, 0];
  for (let i = 1; i < formattedArr.length; ++i) {
    if (formattedArr[i] > maxArrayValuePair) {
      maxArrayValuePair = formattedArr[i];
    }
  }
  return maxArrayValuePair;
}

export default HighestArrayValue;