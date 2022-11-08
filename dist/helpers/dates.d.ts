import * as moment from "moment";
/** YYYY-MM-DD */
export declare type DATE_SHORT = string;
/** YYYY-MM-DDTHH:MM:SSZ */
export declare type DATE_LONG = string;
export declare const isSameDate: (firstDate: DATE_SHORT | moment.Moment, secondDate: DATE_SHORT | moment.Moment, granularity?: moment.unitOfTime.StartOf) => boolean;
export declare const areConsecutiveDays: (firstDate: DATE_SHORT | moment.Moment, secondDate: DATE_SHORT | moment.Moment) => boolean;
export declare const daysBetween: (firstDate: DATE_LONG | moment.Moment, secondDate?: DATE_LONG | moment.Moment) => number;
export declare const nthDate: (d: string) => string;
export declare const millisecondsToDate: (ms: number) => moment.Moment;
