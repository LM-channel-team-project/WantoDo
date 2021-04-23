// Created by 오영롱(youngrongoh) on 2021/04/20
class TimestampParser {
  parseDayNum = (num) => {
    switch (Number(num)) {
      case 0:
        return '일';
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      case 6:
        return '토';
      default:
        throw new Error(`A number of days must be one of 0 to 6: ${num}`);
    }
  };

  parseDate = (timestamp) => {
    const dateObj = new Date(Number(timestamp));

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const date = dateObj.getDate();
    const day = this.parseDayNum(dateObj.getDay());

    return `${year}. ${month}. ${date} (${day})`;
  };

  parsePeriods = (periods) => {
    const start = periods[0];
    const end = periods[1];

    const parsedStart = start ? this.parseDate(start) : '';
    const parsedEnd = end ? this.parseDate(end) : '';

    return parsedEnd ? `${parsedStart} - ${parsedEnd}` : parsedStart;
  };
}

const parser = new TimestampParser();

export default parser;
