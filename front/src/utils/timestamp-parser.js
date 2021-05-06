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

  parseDate = (timestamp, options = {}) => {
    if (!timestamp) return '';
    const { seperator, isDay, isTime, isZeroAdded, type = 'string', is12Hours } = options;

    const converted = new Date(Number(timestamp));

    const year = converted.getFullYear();
    const month = isZeroAdded ? addZero(converted.getMonth() + 1) : converted.getMonth() + 1;
    const date = isZeroAdded ? addZero(converted.getDate()) : converted.getDate();
    const day = this.parseDayNum(converted.getDay());
    const hours = converted.getHours();
    const convertedHours = is12Hours && hours > 12 ? hours - 12 : hours;
    const mins = converted.getMinutes();
    const division = is12Hours ? (hours > 12 ? 'am' : 'pm') : '';

    if (type === 'object') {
      const dateObj = { year, month, date };

      if (isDay) dateObj.day = day;

      if (isTime) {
        dateObj.hours = convertedHours;
        dateObj.mins = mins;
        dateObj.division = division;
      }

      return dateObj;
    }

    const dateArr = [year, month, date];

    if (isDay) dateArr.push(day);
    if (isTime) dateArr.push(convertedHours, mins, division);

    return dateArr.join(seperator || '-');
  };

  parsePeriods = (periods, options) => {
    const start = periods[0];
    const end = periods[1];

    const parsedStart = start ? this.parseDate(start, options) : '';
    const parsedEnd = end ? this.parseDate(end, options) : '';

    return parsedEnd ? `${parsedStart} - ${parsedEnd}` : parsedStart;
  };

  toTimestamp = ({ year, month, date, hours, mins, division }) => {
    const dateArr = [year, month, date];
    const timeArr = division ? [hours, mins, division] : [hours, mins];

    const parsed = Number(new Date(`${dateArr.join('-')} ${timeArr.join(':')}`));
    return Number.isNaN(parsed) ? '' : parsed;
  };
}

const parser = new TimestampParser();

export default parser;
