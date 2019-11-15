export const deepClone = object => {
  return JSON.parse(JSON.stringify(object));
};

export const swapArrayElements = (arr, index1, index2) =>
  arr.map((val, idx) => {
    if (idx === index1) return arr[index2];
    if (idx === index2) return arr[index1];
    return val;
  });

export const moveArrayElement = (arr, sourceIndex, targetIndex) => {
  const elemToMove = arr[sourceIndex];
  arr.splice(sourceIndex, 1);
  arr.splice(targetIndex, 0, elemToMove);
  return arr;
};

export const HSLToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return "#" + r + g + b;
};

export const getContrastYIQ = hexColor => {
  var r = parseInt(hexColor.substr(0, 2), 16);
  var g = parseInt(hexColor.substr(2, 2), 16);
  var b = parseInt(hexColor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};

export const createPalette = itemCount => {
  const delta = Math.round(360 / itemCount);
  let colors = [];
  for (let i = 0; i < itemCount; i++) {
    const bgColor = HSLToHex(i * delta, 100, 50);
    const fgColor = getContrastYIQ(bgColor.substr(1));
    colors.push({ bgColor, fgColor });
  }
};
