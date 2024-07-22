import moment from 'moment';
import 'moment/locale/ru';

export const getDate = (date: any) => {
  let [year, month, day] = date.split('-');
  year = Number(year);
  month = Number(month);
  day = Number(day);

  month = moment().month(month).format('MMMM');

  return `${day} ${month} ${year}`;
};
