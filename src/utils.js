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
