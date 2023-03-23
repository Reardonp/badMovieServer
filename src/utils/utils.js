function isXML(obj) {
  try {
    xml2js.parseString(obj, function (err, result) {
      if (err)
        throw new Error();
    });
    return true;
  } catch (err) {
    return false;
  }
}
function isJSON(obj) {
  try {
    JSON.parse(obj);
    return true;
  } catch (err) {
    return false;
  }
}
