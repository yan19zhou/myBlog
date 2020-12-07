import qs from 'qs'

export function isObject (val) {
    return val !== null && typeof val === 'object'
  }
  // 设置storage
  export function setStore (key, val, type = 'localStorage') {
    if (isObject(val)) window[type].setItem(key, JSON.stringify(val))
    else window[type].setItem(key, val)
  }
  export function getStore (key, type = 'localStorage') {
    var val = window[type].getItem(key)
    try {
      return JSON.parse(val)
    } catch (e) {
      return val
    }
  }

  export function setSessionStore (key, val) {
    setStore(key, val, 'sessionStorage')
  }
  export function getSessionStore (key) {
    return getStore(key)
  }
  // 默认30minute
  export function setExpireStore (key, val, ex = 1.8e6) {
    setStore(key, {v: val, t: Date.now() + ex})
  }
  export function getExpireStore (key) {
    var obj = getStore(key)
    if (obj.t > Date.now()) return obj.v
    else return false
  }

  // 获取字符长度
  export function getByteLen(val) {
    let len = 0
    for (let i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/gi) != null) {
        len += 1
      } else {
        len += 0.5
      }
    }
    return Math.floor(len)
  }

  //参数编码
  export function param(json) {
    if (!json) return ''
    return cleanArray(
      Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
    ).join('&')
  }
   //参数解码
  export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return qs.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )
  }
  //给元素增减class
  export function toggleClass(element, className) {
    if (!element || !className) {
      return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
      classString += '' + className
    } else {
      classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length)
    }
    element.className = classString
  }
  // 获取时间差
  export function getDateDiff(timespan) {
    var dateTime = new Date(timespan);

    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = (now - dateTime)
    if (milliseconds < 1000 * 60 * 1) {
        timeSpanStr = '0分钟';
    } else if (milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟';
    } else if (milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时';
    } else {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天';
    }
    return timeSpanStr;
}


// 比较时间大小 返回Boolean
export function getDataChuo(data, data2) {
    var dateTime = new Date(data).valueOf()
    var dateTime2 = new Date(data2).valueOf()
    var cha = (dateTime2 - dateTime) > 0 ? true : false
    return cha
}

// 格式化时间
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
};

export function dateFormat (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  var week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

