/**
 * Deep copy the given object.
 *
 * @param  {Object} obj
 * @return {Object}
 */
export function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key]);
  });

  return copy;
}

/**
 * If the given value is not an array, wrap it in one.
 *
 * @param  {Any} value
 * @return {Array}
 */
export function arrayWrap(value) {
  return Array.isArray(value) ? value : [value];
}

/**
  * Parse string and return date
  * Function created because in safari browser, parsing via Date constructor doesnt work.
  * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
  
  * @param  {String} value
  * @return {Date}
  */
export function parseDate(value) {
  if (isset(value)) {
    value = value
      .trim()
      .replace(".000Z", "")
      .replace("T", " ");
    const parts = value.split(" ");
    if (value.length === 19) {
      if (parts.length === 2) {
        const dateParts = parts[0].split("-");
        const timeParts = parts[1].split(":");

        const year = dateParts[0];
        const monthIndex = parseInt(dateParts[1]) - 1; //monthIndex
        const day = dateParts[2];

        const hours = timeParts[0];
        const minutes = timeParts[1];
        const seconds = timeParts[1];

        return new Date(year, monthIndex, day, hours, minutes, seconds);
      }
    } else if (value.length === 10) {
      const dateParts = parts[0].split("-");

      const year = dateParts[0];
      const monthIndex = parseInt(dateParts[1]) - 1; //monthIndex
      const day = dateParts[2];

      return new Date(year, monthIndex, day);
    }
  }
  return null;
}

export function isset(val) {
  return val !== undefined && val !== null;
}

/**
 *
 * @param {Date} value
 */
export function formatDateTime(value) {
  return (
    value.getFullYear() +
    "-" +
    appendLeadingZeroes(value.getMonth() + 1) +
    "-" +
    appendLeadingZeroes(value.getDate()) +
    " " +
    appendLeadingZeroes(value.getHours()) +
    ":" +
    appendLeadingZeroes(value.getMinutes()) +
    ":" +
    appendLeadingZeroes(value.getSeconds())
  );
}

/**
 *
 * @param {Date} value
 */
export function formatDate(value) {
  return (
    value.getFullYear() +
    "-" +
    appendLeadingZeroes(value.getMonth() + 1) +
    "-" +
    appendLeadingZeroes(value.getDate())
  );
}

function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}
