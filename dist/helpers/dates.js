"use strict";
exports.__esModule = true;
exports.millisecondsToDate = exports.nthDate = exports.daysBetween = exports.areConsecutiveDays = exports.isSameDate = void 0;
var moment = require("moment");
var isSameDate = function (firstDate, secondDate, granularity) {
    if (granularity === void 0) { granularity = "day"; }
    return moment(firstDate).isSame(secondDate, granularity);
};
exports.isSameDate = isSameDate;
var areConsecutiveDays = function (firstDate, secondDate) { return moment(firstDate).add(1, "day").isSame(secondDate, "day"); };
exports.areConsecutiveDays = areConsecutiveDays;
var daysBetween = function (firstDate, secondDate) {
    if (secondDate === void 0) { secondDate = moment(); }
    return moment(firstDate).diff(secondDate, "days");
};
exports.daysBetween = daysBetween;
var nthDate = function (d) {
    var momentDate = moment(d);
    if (momentDate.date() > 3 && momentDate.date() < 21)
        return "".concat(momentDate.date(), "th");
    switch (momentDate.date() % 10) {
        case 1:
            return "".concat(momentDate.date(), "st");
        case 2:
            return "".concat(momentDate.date(), "nd");
        case 3:
            return "".concat(momentDate.date(), "rd");
        default:
            return "".concat(momentDate.date(), "th");
    }
};
exports.nthDate = nthDate;
var millisecondsToDate = function (ms) { return moment(ms); };
exports.millisecondsToDate = millisecondsToDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9kYXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBaUM7QUFPMUIsSUFBTSxVQUFVLEdBQUcsVUFDeEIsU0FBcUMsRUFDckMsVUFBc0MsRUFDdEMsV0FBOEM7SUFBOUMsNEJBQUEsRUFBQSxtQkFBOEM7SUFDM0MsT0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUM7QUFBakQsQ0FBaUQsQ0FBQztBQUoxQyxRQUFBLFVBQVUsY0FJZ0M7QUFFaEQsSUFBTSxrQkFBa0IsR0FBRyxVQUNoQyxTQUFxQyxFQUNyQyxVQUFzQyxJQUNuQyxPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQXpELENBQXlELENBQUM7QUFIbEQsUUFBQSxrQkFBa0Isc0JBR2dDO0FBRXhELElBQU0sV0FBVyxHQUFHLFVBQ3pCLFNBQW9DLEVBQ3BDLFVBQWdEO0lBQWhELDJCQUFBLEVBQUEsYUFBd0MsTUFBTSxFQUFFO0lBQzdDLE9BQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO0FBQTFDLENBQTBDLENBQUM7QUFIbkMsUUFBQSxXQUFXLGVBR3dCO0FBRXpDLElBQU0sT0FBTyxHQUFHLFVBQUMsQ0FBUztJQUMvQixJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ2pELE9BQU8sVUFBRyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQUksQ0FBQztJQUNsQyxRQUFRLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDOUIsS0FBSyxDQUFDO1lBQ0osT0FBTyxVQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBSSxDQUFDO1FBQ2xDLEtBQUssQ0FBQztZQUNKLE9BQU8sVUFBRyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQUksQ0FBQztRQUNsQyxLQUFLLENBQUM7WUFDSixPQUFPLFVBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFJLENBQUM7UUFDbEM7WUFDRSxPQUFPLFVBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFJLENBQUM7S0FDbkM7QUFDSCxDQUFDLENBQUM7QUFkVyxRQUFBLE9BQU8sV0FjbEI7QUFFSyxJQUFNLGtCQUFrQixHQUFHLFVBQUMsRUFBVSxJQUFvQixPQUFBLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBVixDQUFVLENBQUM7QUFBL0QsUUFBQSxrQkFBa0Isc0JBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuLyoqIFlZWVktTU0tREQgKi9cbmV4cG9ydCB0eXBlIERBVEVfU0hPUlQgPSBzdHJpbmc7XG4vKiogWVlZWS1NTS1ERFRISDpNTTpTU1ogKi9cbmV4cG9ydCB0eXBlIERBVEVfTE9ORyA9IHN0cmluZztcblxuZXhwb3J0IGNvbnN0IGlzU2FtZURhdGUgPSAoXG4gIGZpcnN0RGF0ZTogREFURV9TSE9SVCB8IG1vbWVudC5Nb21lbnQsXG4gIHNlY29uZERhdGU6IERBVEVfU0hPUlQgfCBtb21lbnQuTW9tZW50LFxuICBncmFudWxhcml0eTogbW9tZW50LnVuaXRPZlRpbWUuU3RhcnRPZiA9IFwiZGF5XCJcbikgPT4gbW9tZW50KGZpcnN0RGF0ZSkuaXNTYW1lKHNlY29uZERhdGUsIGdyYW51bGFyaXR5KTtcblxuZXhwb3J0IGNvbnN0IGFyZUNvbnNlY3V0aXZlRGF5cyA9IChcbiAgZmlyc3REYXRlOiBEQVRFX1NIT1JUIHwgbW9tZW50Lk1vbWVudCxcbiAgc2Vjb25kRGF0ZTogREFURV9TSE9SVCB8IG1vbWVudC5Nb21lbnRcbikgPT4gbW9tZW50KGZpcnN0RGF0ZSkuYWRkKDEsIFwiZGF5XCIpLmlzU2FtZShzZWNvbmREYXRlLCBcImRheVwiKTtcblxuZXhwb3J0IGNvbnN0IGRheXNCZXR3ZWVuID0gKFxuICBmaXJzdERhdGU6IERBVEVfTE9ORyB8IG1vbWVudC5Nb21lbnQsXG4gIHNlY29uZERhdGU6IERBVEVfTE9ORyB8IG1vbWVudC5Nb21lbnQgPSBtb21lbnQoKVxuKSA9PiBtb21lbnQoZmlyc3REYXRlKS5kaWZmKHNlY29uZERhdGUsIFwiZGF5c1wiKTtcblxuZXhwb3J0IGNvbnN0IG50aERhdGUgPSAoZDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IG1vbWVudERhdGUgPSBtb21lbnQoZCk7XG4gIGlmIChtb21lbnREYXRlLmRhdGUoKSA+IDMgJiYgbW9tZW50RGF0ZS5kYXRlKCkgPCAyMSlcbiAgICByZXR1cm4gYCR7bW9tZW50RGF0ZS5kYXRlKCl9dGhgO1xuICBzd2l0Y2ggKG1vbWVudERhdGUuZGF0ZSgpICUgMTApIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gYCR7bW9tZW50RGF0ZS5kYXRlKCl9c3RgO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBgJHttb21lbnREYXRlLmRhdGUoKX1uZGA7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGAke21vbWVudERhdGUuZGF0ZSgpfXJkYDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGAke21vbWVudERhdGUuZGF0ZSgpfXRoYDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc1RvRGF0ZSA9IChtczogbnVtYmVyKTogbW9tZW50Lk1vbWVudCA9PiBtb21lbnQobXMpO1xuIl19