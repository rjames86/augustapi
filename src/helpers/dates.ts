import moment from "moment";
import { DATE_SHORT, DATE_LONG } from "airbnbapijs";

export const isSameDate = (
  firstDate: DATE_SHORT | moment.Moment,
  secondDate: DATE_SHORT | moment.Moment,
  granularity: moment.unitOfTime.StartOf = "day"
) => moment(firstDate).isSame(secondDate, granularity);

export const areConsecutiveDays = (
  firstDate: DATE_SHORT | moment.Moment,
  secondDate: DATE_SHORT | moment.Moment
) => moment(firstDate).add(1, "day").isSame(secondDate, "day");

export const daysBetween = (
  firstDate: DATE_LONG | moment.Moment,
  secondDate: DATE_LONG | moment.Moment = moment()
) => moment(firstDate).diff(secondDate, "days");

export const nthDate = (d: string) => {
  const momentDate = moment(d);
  if (momentDate.date() > 3 && momentDate.date() < 21)
    return `${momentDate.date()}th`;
  switch (momentDate.date() % 10) {
    case 1:
      return `${momentDate.date()}st`;
    case 2:
      return `${momentDate.date()}nd`;
    case 3:
      return `${momentDate.date()}rd`;
    default:
      return `${momentDate.date()}th`;
  }
};

export const millisecondsToDate = (ms: number): moment.Moment => moment(ms);
