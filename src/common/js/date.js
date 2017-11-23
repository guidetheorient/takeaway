export function formatDate(date, formatType) {
  if (/(y+)/.test(formatType)) {
    let str = date.getFullYear() + '';
    formatType = formatType.replace(RegExp.$1, str.substr(4 - RegExp.$1.length));
  }
  console.log(formatType);
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let key in o) {
    let str = o[key] + '';
    if (new RegExp(`(${key})`).test(formatType)) {
      formatType = formatType.replace(RegExp.$1, RegExp.$1.length === 2 ? padLeftZero(str) : str);
    }
  }
  return formatType;
};

function padLeftZero(str) {
  let string = ('00' + str).substr(str.length);
  return string;
}
