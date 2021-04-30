// Created by 오영롱(youngrongoh) on 2021/04/30
function getDays(style) {
  const days = {
    kor: ['일', '월', '화', '수', '목', '금', '토'],
    eng: ['Sun', 'Mon', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  return days[style];
}

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

// Created by 오영롱(youngrongoh) on 2021/04/20
class TimestampParser {
  parseDayNum = (num) => {
    if (num > 6) throw new Error(`A number of days must be one of 0 to 6: ${num}`);

    const days = getDays('kor');

    return days[Number(num)];
  };

  parseDate = (timestamp, { seperator, isDay, isZeroAdded } = {}) => {
    if (!timestamp) return '';

    const dateObj = new Date(Number(timestamp));

    const year = dateObj.getFullYear();
    const month = isZeroAdded ? addZero(dateObj.getMonth()) : dateObj.getMonth();
    const date = isZeroAdded ? addZero(dateObj.getDate()) : dateObj.getDate();
    const day = this.parseDayNum(dateObj.getDay());

    const dateArr = isDay ? [year, month, date, day] : [year, month, date];

    return dateArr.join(seperator || '-');
  };

  parsePeriods = (periods, options) => {
    const start = periods[0];
    const end = periods[1];

    const parsedStart = start ? this.parseDate(start, options) : '';
    const parsedEnd = end ? this.parseDate(end, options) : '';

    return parsedEnd ? `${parsedStart} - ${parsedEnd}` : parsedStart;
  };
}

const parser = new TimestampParser();

export default parser;
