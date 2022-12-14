"use strict";
exports.__esModule = true;
exports.API_UNLOCK_URL = exports.API_LOCK_URL = exports.API_GET_PINS_URL = exports.API_GET_LOCK_STATUS_URL = exports.API_GET_LOCK_URL = exports.API_GET_LOCKS_URL = exports.API_GET_HOUSE_URL = exports.API_GET_HOUSES_URL = exports.API_WAKEUP_DOORBELL_URL = exports.API_GET_DOORBELL_URL = exports.API_GET_DOORBELLS_URL = exports.API_GET_HOUSE_ACTIVITIES_URL = exports.API_VALIDATE_VERIFICATION_CODE_URLS = exports.API_SEND_VERIFICATION_CODE_URLS = exports.API_GET_SESSION_URL = void 0;
var API_BASE_URL = "https://api-production.august.com";
exports.API_GET_SESSION_URL = API_BASE_URL + "/session";
exports.API_SEND_VERIFICATION_CODE_URLS = {
    phone: API_BASE_URL + "/validation/phone",
    email: API_BASE_URL + "/validation/email"
};
exports.API_VALIDATE_VERIFICATION_CODE_URLS = {
    phone: API_BASE_URL + "/validate/phone",
    email: API_BASE_URL + "/validate/email"
};
var API_GET_HOUSE_ACTIVITIES_URL = function (house_id) {
    return API_BASE_URL + "/houses/".concat(house_id, "/activities");
};
exports.API_GET_HOUSE_ACTIVITIES_URL = API_GET_HOUSE_ACTIVITIES_URL;
exports.API_GET_DOORBELLS_URL = API_BASE_URL + "/users/doorbells/mine";
var API_GET_DOORBELL_URL = function (doorbell_id) {
    return API_BASE_URL + "/doorbells/".concat(doorbell_id);
};
exports.API_GET_DOORBELL_URL = API_GET_DOORBELL_URL;
var API_WAKEUP_DOORBELL_URL = function (doorbell_id) {
    return API_BASE_URL + "/doorbells/".concat(doorbell_id, "/wakeup");
};
exports.API_WAKEUP_DOORBELL_URL = API_WAKEUP_DOORBELL_URL;
exports.API_GET_HOUSES_URL = API_BASE_URL + "/users/houses/mine";
var API_GET_HOUSE_URL = function (house_id) {
    return API_BASE_URL + "/houses/".concat(house_id);
};
exports.API_GET_HOUSE_URL = API_GET_HOUSE_URL;
exports.API_GET_LOCKS_URL = API_BASE_URL + "/users/locks/mine";
var API_GET_LOCK_URL = function (lock_id) {
    return API_BASE_URL + "/locks/".concat(lock_id);
};
exports.API_GET_LOCK_URL = API_GET_LOCK_URL;
var API_GET_LOCK_STATUS_URL = function (lock_id) {
    return API_BASE_URL + "/locks/".concat(lock_id, "/status");
};
exports.API_GET_LOCK_STATUS_URL = API_GET_LOCK_STATUS_URL;
var API_GET_PINS_URL = function (lock_id) {
    return API_BASE_URL + "/locks/".concat(lock_id, "/pins");
};
exports.API_GET_PINS_URL = API_GET_PINS_URL;
var API_LOCK_URL = function (lock_id) {
    return API_BASE_URL + "/remoteoperate/".concat(lock_id, "/lock");
};
exports.API_LOCK_URL = API_LOCK_URL;
var API_UNLOCK_URL = function (lock_id) {
    return API_BASE_URL + "/remoteoperate/".concat(lock_id, "/unlock");
};
exports.API_UNLOCK_URL = API_UNLOCK_URL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuZHBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFNLFlBQVksR0FBRyxtQ0FBbUMsQ0FBQztBQUM1QyxRQUFBLG1CQUFtQixHQUFHLFlBQVksR0FBRyxVQUFVLENBQUM7QUFDaEQsUUFBQSwrQkFBK0IsR0FBRztJQUM3QyxLQUFLLEVBQUUsWUFBWSxHQUFHLG1CQUFtQjtJQUN6QyxLQUFLLEVBQUUsWUFBWSxHQUFHLG1CQUFtQjtDQUMxQyxDQUFDO0FBUVcsUUFBQSxtQ0FBbUMsR0FBZ0M7SUFDOUUsS0FBSyxFQUFFLFlBQVksR0FBRyxpQkFBaUI7SUFDdkMsS0FBSyxFQUFFLFlBQVksR0FBRyxpQkFBaUI7Q0FDeEMsQ0FBQztBQUVLLElBQU0sNEJBQTRCLEdBQUcsVUFBQyxRQUFnQjtJQUMzRCxPQUFBLFlBQVksR0FBRyxrQkFBVyxRQUFRLGdCQUFhO0FBQS9DLENBQStDLENBQUM7QUFEckMsUUFBQSw0QkFBNEIsZ0NBQ1M7QUFDckMsUUFBQSxxQkFBcUIsR0FBRyxZQUFZLEdBQUcsdUJBQXVCLENBQUM7QUFDckUsSUFBTSxvQkFBb0IsR0FBRyxVQUFDLFdBQW1CO0lBQ3RELE9BQUEsWUFBWSxHQUFHLHFCQUFjLFdBQVcsQ0FBRTtBQUExQyxDQUEwQyxDQUFDO0FBRGhDLFFBQUEsb0JBQW9CLHdCQUNZO0FBQ3RDLElBQU0sdUJBQXVCLEdBQUcsVUFBQyxXQUFtQjtJQUN6RCxPQUFBLFlBQVksR0FBRyxxQkFBYyxXQUFXLFlBQVM7QUFBakQsQ0FBaUQsQ0FBQztBQUR2QyxRQUFBLHVCQUF1QiwyQkFDZ0I7QUFDdkMsUUFBQSxrQkFBa0IsR0FBRyxZQUFZLEdBQUcsb0JBQW9CLENBQUM7QUFDL0QsSUFBTSxpQkFBaUIsR0FBRyxVQUFDLFFBQWdCO0lBQ2hELE9BQUEsWUFBWSxHQUFHLGtCQUFXLFFBQVEsQ0FBRTtBQUFwQyxDQUFvQyxDQUFDO0FBRDFCLFFBQUEsaUJBQWlCLHFCQUNTO0FBQzFCLFFBQUEsaUJBQWlCLEdBQUcsWUFBWSxHQUFHLG1CQUFtQixDQUFDO0FBQzdELElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxPQUFlO0lBQzlDLE9BQUEsWUFBWSxHQUFHLGlCQUFVLE9BQU8sQ0FBRTtBQUFsQyxDQUFrQyxDQUFDO0FBRHhCLFFBQUEsZ0JBQWdCLG9CQUNRO0FBQzlCLElBQU0sdUJBQXVCLEdBQUcsVUFBQyxPQUFlO0lBQ3JELE9BQUEsWUFBWSxHQUFHLGlCQUFVLE9BQU8sWUFBUztBQUF6QyxDQUF5QyxDQUFDO0FBRC9CLFFBQUEsdUJBQXVCLDJCQUNRO0FBQ3JDLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxPQUFlO0lBQzlDLE9BQUEsWUFBWSxHQUFHLGlCQUFVLE9BQU8sVUFBTztBQUF2QyxDQUF1QyxDQUFDO0FBRDdCLFFBQUEsZ0JBQWdCLG9CQUNhO0FBQ25DLElBQU0sWUFBWSxHQUFHLFVBQUMsT0FBZTtJQUMxQyxPQUFBLFlBQVksR0FBRyx5QkFBa0IsT0FBTyxVQUFPO0FBQS9DLENBQStDLENBQUM7QUFEckMsUUFBQSxZQUFZLGdCQUN5QjtBQUMzQyxJQUFNLGNBQWMsR0FBRyxVQUFDLE9BQWU7SUFDNUMsT0FBQSxZQUFZLEdBQUcseUJBQWtCLE9BQU8sWUFBUztBQUFqRCxDQUFpRCxDQUFDO0FBRHZDLFFBQUEsY0FBYyxrQkFDeUIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBUElfQkFTRV9VUkwgPSBcImh0dHBzOi8vYXBpLXByb2R1Y3Rpb24uYXVndXN0LmNvbVwiO1xuZXhwb3J0IGNvbnN0IEFQSV9HRVRfU0VTU0lPTl9VUkwgPSBBUElfQkFTRV9VUkwgKyBcIi9zZXNzaW9uXCI7XG5leHBvcnQgY29uc3QgQVBJX1NFTkRfVkVSSUZJQ0FUSU9OX0NPREVfVVJMUyA9IHtcbiAgcGhvbmU6IEFQSV9CQVNFX1VSTCArIFwiL3ZhbGlkYXRpb24vcGhvbmVcIixcbiAgZW1haWw6IEFQSV9CQVNFX1VSTCArIFwiL3ZhbGlkYXRpb24vZW1haWxcIixcbn07XG5cbmV4cG9ydCB0eXBlIExvZ2luTWV0aG9kID0gXCJwaG9uZVwiIHwgXCJlbWFpbFwiO1xuXG50eXBlIEFwaVZhbGlkYXRlVmVyaWZpY2F0aW9uQ29kZSA9IHtcbiAgW2tleSBpbiBMb2dpbk1ldGhvZF06IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBBUElfVkFMSURBVEVfVkVSSUZJQ0FUSU9OX0NPREVfVVJMUzogQXBpVmFsaWRhdGVWZXJpZmljYXRpb25Db2RlID0ge1xuICBwaG9uZTogQVBJX0JBU0VfVVJMICsgXCIvdmFsaWRhdGUvcGhvbmVcIixcbiAgZW1haWw6IEFQSV9CQVNFX1VSTCArIFwiL3ZhbGlkYXRlL2VtYWlsXCIsXG59O1xuXG5leHBvcnQgY29uc3QgQVBJX0dFVF9IT1VTRV9BQ1RJVklUSUVTX1VSTCA9IChob3VzZV9pZDogc3RyaW5nKSA9PlxuICBBUElfQkFTRV9VUkwgKyBgL2hvdXNlcy8ke2hvdXNlX2lkfS9hY3Rpdml0aWVzYDtcbmV4cG9ydCBjb25zdCBBUElfR0VUX0RPT1JCRUxMU19VUkwgPSBBUElfQkFTRV9VUkwgKyBcIi91c2Vycy9kb29yYmVsbHMvbWluZVwiO1xuZXhwb3J0IGNvbnN0IEFQSV9HRVRfRE9PUkJFTExfVVJMID0gKGRvb3JiZWxsX2lkOiBzdHJpbmcpID0+XG4gIEFQSV9CQVNFX1VSTCArIGAvZG9vcmJlbGxzLyR7ZG9vcmJlbGxfaWR9YDtcbmV4cG9ydCBjb25zdCBBUElfV0FLRVVQX0RPT1JCRUxMX1VSTCA9IChkb29yYmVsbF9pZDogc3RyaW5nKSA9PlxuICBBUElfQkFTRV9VUkwgKyBgL2Rvb3JiZWxscy8ke2Rvb3JiZWxsX2lkfS93YWtldXBgO1xuZXhwb3J0IGNvbnN0IEFQSV9HRVRfSE9VU0VTX1VSTCA9IEFQSV9CQVNFX1VSTCArIFwiL3VzZXJzL2hvdXNlcy9taW5lXCI7XG5leHBvcnQgY29uc3QgQVBJX0dFVF9IT1VTRV9VUkwgPSAoaG91c2VfaWQ6IHN0cmluZykgPT5cbiAgQVBJX0JBU0VfVVJMICsgYC9ob3VzZXMvJHtob3VzZV9pZH1gO1xuZXhwb3J0IGNvbnN0IEFQSV9HRVRfTE9DS1NfVVJMID0gQVBJX0JBU0VfVVJMICsgXCIvdXNlcnMvbG9ja3MvbWluZVwiO1xuZXhwb3J0IGNvbnN0IEFQSV9HRVRfTE9DS19VUkwgPSAobG9ja19pZDogc3RyaW5nKSA9PlxuICBBUElfQkFTRV9VUkwgKyBgL2xvY2tzLyR7bG9ja19pZH1gO1xuZXhwb3J0IGNvbnN0IEFQSV9HRVRfTE9DS19TVEFUVVNfVVJMID0gKGxvY2tfaWQ6IHN0cmluZykgPT5cbiAgQVBJX0JBU0VfVVJMICsgYC9sb2Nrcy8ke2xvY2tfaWR9L3N0YXR1c2A7XG5leHBvcnQgY29uc3QgQVBJX0dFVF9QSU5TX1VSTCA9IChsb2NrX2lkOiBzdHJpbmcpID0+XG4gIEFQSV9CQVNFX1VSTCArIGAvbG9ja3MvJHtsb2NrX2lkfS9waW5zYDtcbmV4cG9ydCBjb25zdCBBUElfTE9DS19VUkwgPSAobG9ja19pZDogc3RyaW5nKSA9PlxuICBBUElfQkFTRV9VUkwgKyBgL3JlbW90ZW9wZXJhdGUvJHtsb2NrX2lkfS9sb2NrYDtcbmV4cG9ydCBjb25zdCBBUElfVU5MT0NLX1VSTCA9IChsb2NrX2lkOiBzdHJpbmcpID0+XG4gIEFQSV9CQVNFX1VSTCArIGAvcmVtb3Rlb3BlcmF0ZS8ke2xvY2tfaWR9L3VubG9ja2A7XG4iXX0=