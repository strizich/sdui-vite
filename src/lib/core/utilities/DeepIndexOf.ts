 const deepIndexOf = (arr, obj) => {
  return arr.findIndex((cur) =>{
    return Object.keys(obj).every(function (key) {
      return obj[key] === cur[key];
    });
  });
}

export default deepIndexOf
