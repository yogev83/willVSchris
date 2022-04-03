export const superShortTimeout = (callback) => {
  return setTimeout(callback, 50);
};

export const shortTimeout = (callback) => {
  return setTimeout(callback, 100);
};

export const meduimTimeout = (callback) => {
  return setTimeout(callback, 200);
};

export const longTimeout = (callback) => {
  return setTimeout(callback, 300);
};

export const superLongTimeout = (callback) => {
  return setTimeout(callback, 1000);
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const getTranslateValues = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = style.transform || style.webkitTransform || style.mozTransform;

  // No transform property. Simply return 0 values.
  if (matrix === "none") {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes("3d") ? "3d" : "2d";
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === "2d") {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0,
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === "3d") {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14],
    };
  }
};
