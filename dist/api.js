"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.API = void 0;
var rp = require("request-promise");
var endpoints_1 = require("./endpoints");
var constants_1 = require("./constants");
var dates_1 = require("./helpers/dates");
var API = /** @class */ (function () {
    function API() {
    }
    API.prototype._callApi = function (url, method, data, accessToken, opts) {
        if (accessToken === void 0) { accessToken = null; }
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var options;
            var _a, _b;
            return __generator(this, function (_c) {
                options = {
                    uri: url,
                    headers: (_a = {},
                        _a[constants_1.HEADER_AUGUST_API_KEY] = constants_1.HEADER_VALUE_API_KEY,
                        _a[constants_1.HEADER_CONTENT_TYPE] = constants_1.HEADER_VALUE_CONTENT_TYPE,
                        _a[constants_1.HEADER_USER_AGENT] = constants_1.HEADER_VALUE_USER_AGENT,
                        _a[constants_1.HEADER_AUGUST_BRANDING] = constants_1.HEADER_VALUE_AUGUST_BRANDING,
                        _a[constants_1.HEADER_AUGUST_COUNTRY] = constants_1.HEADER_VALUE_AUGUST_COUNTRY,
                        _a),
                    method: method,
                    json: true
                };
                if (opts.version != null) {
                    options.headers[constants_1.HEADER_ACCEPT_VERSION] = opts.version;
                    delete opts.version;
                }
                else {
                    options.headers[constants_1.HEADER_ACCEPT_VERSION] = constants_1.HEADER_VALUE_ACCEPT_VERSION;
                }
                options = __assign(__assign({}, options), opts);
                if (accessToken !== null) {
                    options = __assign(__assign({}, options), { headers: __assign(__assign({}, options.headers), (_b = {}, _b[constants_1.HEADER_AUGUST_ACCESS_TOKEN] = accessToken, _b)) });
                }
                if (data != null) {
                    options = __assign(__assign({}, options), { body: data });
                }
                return [2 /*return*/, rp(options)];
            });
        });
    };
    API.prototype.getSession = function (install_id, identifier, password) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._callApi(endpoints_1.API_GET_SESSION_URL, "post", {
                            installId: install_id,
                            identifier: identifier,
                            password: password
                        }, null, {
                            transform: function (body, response, resolveWithFullResponse) {
                                return {
                                    headers: response.headers,
                                    data: body
                                };
                            }
                        })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    API.prototype.sendVerificationCode = function (access_token, login_method, username) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._callApi(endpoints_1.API_SEND_VERIFICATION_CODE_URLS[login_method], "post", { value: username }, access_token)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    API.prototype.validateVerificationCode = function (access_token, login_method, username, verification_code) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._callApi(endpoints_1.API_VALIDATE_VERIFICATION_CODE_URLS[login_method], "post", (_a = {},
                            _a[login_method] = username,
                            _a.code = verification_code.toString(),
                            _a), access_token)];
                    case 1:
                        resp = _b.sent();
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    API.prototype.refreshToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    API.prototype.getHouses = function (auth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._callApi(endpoints_1.API_GET_HOUSES_URL, "get", null, auth.access_token)];
            });
        });
    };
    API.prototype.getHouse = function (auth, houseId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._callApi((0, endpoints_1.API_GET_HOUSE_URL)(houseId), "get", null, auth.access_token)];
            });
        });
    };
    API.prototype.getLocks = function (auth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._callApi(endpoints_1.API_GET_LOCKS_URL, "get", null, auth.access_token)];
            });
        });
    };
    API.prototype.getLockDetail = function (auth, lock_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._callApi((0, endpoints_1.API_GET_LOCK_URL)(lock_id), "get", null, auth.access_token)];
            });
        });
    };
    API.prototype.getPins = function (auth, lock_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._callApi((0, endpoints_1.API_GET_PINS_URL)(lock_id), "get", null, auth.access_token)];
            });
        });
    };
    API.prototype.getHouseActivities = function (auth, house_id) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, createActivity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._callApi((0, endpoints_1.API_GET_HOUSE_ACTIVITIES_URL)(house_id), "get", { limit: 100 }, auth.access_token, {
                            version: "4.0.0"
                        })];
                    case 1:
                        resp = _a.sent();
                        createActivity = function (activity) { return ({
                            activity_type: "lock_operation",
                            activity_id: activity.id,
                            house_id: "",
                            activity_time_raw: activity.timestamp,
                            activity_time: (0, dates_1.millisecondsToDate)(activity.timestamp),
                            action: activity.action,
                            device_id: activity.deviceID,
                            device_type: activity.deviceType,
                            user: activity.user
                        }); };
                        return [2 /*return*/, resp.events.map(createActivity)];
                }
            });
        });
    };
    API.prototype.getRefreshToken = function (auth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._callApi(endpoints_1.API_GET_HOUSES_URL, "get", null, auth.access_token, {
                        transform: function (body, response, resolveWithFullResponse) {
                            return {
                                headers: response.headers,
                                data: body
                            };
                        }
                    })];
            });
        });
    };
    return API;
}());
exports.API = API;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUFzQztBQUV0Qyx5Q0FXcUI7QUFDckIseUNBY3FCO0FBV3JCLHlDQUFxRDtBQUVyRDtJQUFBO0lBdU1BLENBQUM7SUF0TU8sc0JBQVEsR0FBZCxVQUNFLEdBQVcsRUFDWCxNQUFjLEVBQ2QsSUFBUyxFQUNULFdBQWlDLEVBQ2pDLElBQWM7UUFEZCw0QkFBQSxFQUFBLGtCQUFpQztRQUNqQyxxQkFBQSxFQUFBLFNBQWM7Ozs7O2dCQUVWLE9BQU8sR0FBZTtvQkFDeEIsR0FBRyxFQUFFLEdBQUc7b0JBQ1IsT0FBTzt3QkFDTCxHQUFDLGlDQUFxQixJQUFHLGdDQUFvQjt3QkFDN0MsR0FBQywrQkFBbUIsSUFBRyxxQ0FBeUI7d0JBQ2hELEdBQUMsNkJBQWlCLElBQUcsbUNBQXVCO3dCQUM1QyxHQUFDLGtDQUFzQixJQUFHLHdDQUE0Qjt3QkFDdEQsR0FBQyxpQ0FBcUIsSUFBRyx1Q0FBMkI7MkJBQ3JEO29CQUNELE1BQU0sUUFBQTtvQkFDTixJQUFJLEVBQUUsSUFBSTtpQkFDWCxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQ3hCLE9BQU8sQ0FBQyxPQUFRLENBQUMsaUNBQXFCLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUN2RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxPQUFRLENBQUMsaUNBQXFCLENBQUMsR0FBRyx1Q0FBMkIsQ0FBQztpQkFDdkU7Z0JBRUQsT0FBTyx5QkFDRixPQUFPLEdBQ1AsSUFBSSxDQUNSLENBQUM7Z0JBRUYsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO29CQUN4QixPQUFPLHlCQUNGLE9B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QWEsRUFBRSx1QkFBNEI7NEJBQ2hFLE9BQU87Z0NBQ0wsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO2dDQUN6QixJQUFJLEVBQUUsSUFBSTs2QkFDWCxDQUFDO3dCQUNKLENBQUM7cUJBQ0YsQ0FBQyxFQUFDOzs7S0FDSjtJQUNILFVBQUM7QUFBRCxDQUFDLEFBdk1ELElBdU1DO0FBdk1ZLGtCQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcnAgZnJvbSBcInJlcXVlc3QtcHJvbWlzZVwiO1xuXG5pbXBvcnQge1xuICBBUElfR0VUX1NFU1NJT05fVVJMLFxuICBBUElfU0VORF9WRVJJRklDQVRJT05fQ09ERV9VUkxTLFxuICBBUElfVkFMSURBVEVfVkVSSUZJQ0FUSU9OX0NPREVfVVJMUyxcbiAgQVBJX0dFVF9QSU5TX1VSTCxcbiAgTG9naW5NZXRob2QsXG4gIEFQSV9HRVRfTE9DS1NfVVJMLFxuICBBUElfR0VUX0xPQ0tfVVJMLFxuICBBUElfR0VUX0hPVVNFU19VUkwsXG4gIEFQSV9HRVRfSE9VU0VfQUNUSVZJVElFU19VUkwsXG4gIEFQSV9HRVRfSE9VU0VfVVJMLFxufSBmcm9tIFwiLi9lbmRwb2ludHNcIjtcbmltcG9ydCB7XG4gIEhFQURFUl9BQ0NFUFRfVkVSU0lPTixcbiAgSEVBREVSX0FVR1VTVF9BUElfS0VZLFxuICBIRUFERVJfQ09OVEVOVF9UWVBFLFxuICBIRUFERVJfVVNFUl9BR0VOVCxcbiAgSEVBREVSX0FVR1VTVF9BQ0NFU1NfVE9LRU4sXG4gIEhFQURFUl9WQUxVRV9BUElfS0VZLFxuICBIRUFERVJfVkFMVUVfQ09OVEVOVF9UWVBFLFxuICBIRUFERVJfVkFMVUVfVVNFUl9BR0VOVCxcbiAgSEVBREVSX1ZBTFVFX0FDQ0VQVF9WRVJTSU9OLFxuICBIRUFERVJfVkFMVUVfQVVHVVNUX0JSQU5ESU5HLFxuICBIRUFERVJfQVVHVVNUX0JSQU5ESU5HLFxuICBIRUFERVJfQVVHVVNUX0NPVU5UUlksXG4gIEhFQURFUl9WQUxVRV9BVUdVU1RfQ09VTlRSWSxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBJQXV0aGVudGljYXRpb24sXG4gIExvY2tSZXNwb25zZSxcbiAgUGluUmVzcG9uc2UsXG4gIExvY2tEZXRhaWwsXG4gIEFjdGl2aXR5LFxuICBIb3VzZSxcbiAgQWN0aXZpdHlSZXNwb25zZSxcbiAgQWN0aXZpdHlFdmVudCxcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBtaWxsaXNlY29uZHNUb0RhdGUgfSBmcm9tIFwiLi9oZWxwZXJzL2RhdGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBBUEkge1xuICBhc3luYyBfY2FsbEFwaShcbiAgICB1cmw6IHN0cmluZyxcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICBkYXRhOiBhbnksXG4gICAgYWNjZXNzVG9rZW46IHN0cmluZyB8IG51bGwgPSBudWxsLFxuICAgIG9wdHM6IGFueSA9IHt9XG4gICkge1xuICAgIGxldCBvcHRpb25zOiBycC5PcHRpb25zID0ge1xuICAgICAgdXJpOiB1cmwsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFtIRUFERVJfQVVHVVNUX0FQSV9LRVldOiBIRUFERVJfVkFMVUVfQVBJX0tFWSxcbiAgICAgICAgW0hFQURFUl9DT05URU5UX1RZUEVdOiBIRUFERVJfVkFMVUVfQ09OVEVOVF9UWVBFLFxuICAgICAgICBbSEVBREVSX1VTRVJfQUdFTlRdOiBIRUFERVJfVkFMVUVfVVNFUl9BR0VOVCxcbiAgICAgICAgW0hFQURFUl9BVUdVU1RfQlJBTkRJTkddOiBIRUFERVJfVkFMVUVfQVVHVVNUX0JSQU5ESU5HLFxuICAgICAgICBbSEVBREVSX0FVR1VTVF9DT1VOVFJZXTogSEVBREVSX1ZBTFVFX0FVR1VTVF9DT1VOVFJZLFxuICAgICAgfSxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGpzb246IHRydWUsXG4gICAgfTtcbiAgICBpZiAob3B0cy52ZXJzaW9uICE9IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyFbSEVBREVSX0FDQ0VQVF9WRVJTSU9OXSA9IG9wdHMudmVyc2lvbjtcbiAgICAgIGRlbGV0ZSBvcHRzLnZlcnNpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMuaGVhZGVycyFbSEVBREVSX0FDQ0VQVF9WRVJTSU9OXSA9IEhFQURFUl9WQUxVRV9BQ0NFUFRfVkVSU0lPTjtcbiAgICB9XG5cbiAgICBvcHRpb25zID0ge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIC4uLm9wdHMsXG4gICAgfTtcblxuICAgIGlmIChhY2Nlc3NUb2tlbiAhPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIC4uLm9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICBbSEVBREVSX0FVR1VTVF9BQ0NFU1NfVE9LRU5dOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgIT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJwKG9wdGlvbnMpO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2Vzc2lvbihpbnN0YWxsX2lkOiBzdHJpbmcsIGlkZW50aWZpZXI6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLl9jYWxsQXBpKFxuICAgICAgQVBJX0dFVF9TRVNTSU9OX1VSTCxcbiAgICAgIFwicG9zdFwiLFxuICAgICAge1xuICAgICAgICBpbnN0YWxsSWQ6IGluc3RhbGxfaWQsXG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgIH0sXG4gICAgICBudWxsLFxuICAgICAge1xuICAgICAgICB0cmFuc2Zvcm06IChib2R5OiBhbnksIHJlc3BvbnNlOiBhbnksIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICAgIGRhdGE6IGJvZHksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiByZXNwO1xuICB9XG5cbiAgYXN5bmMgc2VuZFZlcmlmaWNhdGlvbkNvZGUoXG4gICAgYWNjZXNzX3Rva2VuOiBzdHJpbmcsXG4gICAgbG9naW5fbWV0aG9kOiBMb2dpbk1ldGhvZCxcbiAgICB1c2VybmFtZTogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLl9jYWxsQXBpKFxuICAgICAgQVBJX1NFTkRfVkVSSUZJQ0FUSU9OX0NPREVfVVJMU1tsb2dpbl9tZXRob2RdLFxuICAgICAgXCJwb3N0XCIsXG4gICAgICB7IHZhbHVlOiB1c2VybmFtZSB9LFxuICAgICAgYWNjZXNzX3Rva2VuXG4gICAgKTtcbiAgICByZXR1cm4gcmVzcDtcbiAgfVxuXG4gIGFzeW5jIHZhbGlkYXRlVmVyaWZpY2F0aW9uQ29kZShcbiAgICBhY2Nlc3NfdG9rZW46IHN0cmluZyxcbiAgICBsb2dpbl9tZXRob2Q6IExvZ2luTWV0aG9kLFxuICAgIHVzZXJuYW1lOiBzdHJpbmcsXG4gICAgdmVyaWZpY2F0aW9uX2NvZGU6IG51bWJlclxuICApIHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5fY2FsbEFwaShcbiAgICAgIEFQSV9WQUxJREFURV9WRVJJRklDQVRJT05fQ09ERV9VUkxTW2xvZ2luX21ldGhvZF0sXG4gICAgICBcInBvc3RcIixcbiAgICAgIHtcbiAgICAgICAgW2xvZ2luX21ldGhvZF06IHVzZXJuYW1lLFxuICAgICAgICBjb2RlOiB2ZXJpZmljYXRpb25fY29kZS50b1N0cmluZygpLFxuICAgICAgfSxcbiAgICAgIGFjY2Vzc190b2tlblxuICAgICk7XG4gICAgcmV0dXJuIHJlc3A7XG4gIH1cblxuICBhc3luYyByZWZyZXNoVG9rZW4oKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXN5bmMgZ2V0SG91c2VzKGF1dGg6IElBdXRoZW50aWNhdGlvbik6IFByb21pc2U8QXJyYXk8SG91c2U+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGxBcGkoQVBJX0dFVF9IT1VTRVNfVVJMLCBcImdldFwiLCBudWxsLCBhdXRoLmFjY2Vzc190b2tlbik7XG4gIH1cblxuICBhc3luYyBnZXRIb3VzZShhdXRoOiBJQXV0aGVudGljYXRpb24sIGhvdXNlSWQ6IHN0cmluZyk6IFByb21pc2U8SG91c2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbEFwaShcbiAgICAgIEFQSV9HRVRfSE9VU0VfVVJMKGhvdXNlSWQpLFxuICAgICAgXCJnZXRcIixcbiAgICAgIG51bGwsXG4gICAgICBhdXRoLmFjY2Vzc190b2tlblxuICAgICk7XG4gIH1cblxuICBhc3luYyBnZXRMb2NrcyhhdXRoOiBJQXV0aGVudGljYXRpb24pOiBQcm9taXNlPExvY2tSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jYWxsQXBpKEFQSV9HRVRfTE9DS1NfVVJMLCBcImdldFwiLCBudWxsLCBhdXRoLmFjY2Vzc190b2tlbik7XG4gIH1cblxuICBhc3luYyBnZXRMb2NrRGV0YWlsKFxuICAgIGF1dGg6IElBdXRoZW50aWNhdGlvbixcbiAgICBsb2NrX2lkOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxMb2NrRGV0YWlsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGxBcGkoXG4gICAgICBBUElfR0VUX0xPQ0tfVVJMKGxvY2tfaWQpLFxuICAgICAgXCJnZXRcIixcbiAgICAgIG51bGwsXG4gICAgICBhdXRoLmFjY2Vzc190b2tlblxuICAgICk7XG4gIH1cblxuICBhc3luYyBnZXRQaW5zKGF1dGg6IElBdXRoZW50aWNhdGlvbiwgbG9ja19pZDogc3RyaW5nKTogUHJvbWlzZTxQaW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9jYWxsQXBpKFxuICAgICAgQVBJX0dFVF9QSU5TX1VSTChsb2NrX2lkKSxcbiAgICAgIFwiZ2V0XCIsXG4gICAgICBudWxsLFxuICAgICAgYXV0aC5hY2Nlc3NfdG9rZW5cbiAgICApO1xuICB9XG5cbiAgYXN5bmMgZ2V0SG91c2VBY3Rpdml0aWVzKFxuICAgIGF1dGg6IElBdXRoZW50aWNhdGlvbixcbiAgICBob3VzZV9pZDogc3RyaW5nXG4gICk6IFByb21pc2U8QXJyYXk8QWN0aXZpdHk+PiB7XG4gICAgY29uc3QgcmVzcDogQWN0aXZpdHlSZXNwb25zZSA9IGF3YWl0IHRoaXMuX2NhbGxBcGkoXG4gICAgICBBUElfR0VUX0hPVVNFX0FDVElWSVRJRVNfVVJMKGhvdXNlX2lkKSxcbiAgICAgIFwiZ2V0XCIsXG4gICAgICB7IGxpbWl0OiAxMDAgfSxcbiAgICAgIGF1dGguYWNjZXNzX3Rva2VuLFxuICAgICAge1xuICAgICAgICB2ZXJzaW9uOiBcIjQuMC4wXCIsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IGNyZWF0ZUFjdGl2aXR5ID0gKGFjdGl2aXR5OiBBY3Rpdml0eUV2ZW50KTogQWN0aXZpdHkgPT4gKHtcbiAgICAgIGFjdGl2aXR5X3R5cGU6IFwibG9ja19vcGVyYXRpb25cIixcbiAgICAgIGFjdGl2aXR5X2lkOiBhY3Rpdml0eS5pZCxcbiAgICAgIGhvdXNlX2lkOiBcIlwiLFxuICAgICAgYWN0aXZpdHlfdGltZV9yYXc6IGFjdGl2aXR5LnRpbWVzdGFtcCxcbiAgICAgIGFjdGl2aXR5X3RpbWU6IG1pbGxpc2Vjb25kc1RvRGF0ZShhY3Rpdml0eS50aW1lc3RhbXApLFxuICAgICAgYWN0aW9uOiBhY3Rpdml0eS5hY3Rpb24sXG4gICAgICBkZXZpY2VfaWQ6IGFjdGl2aXR5LmRldmljZUlELFxuICAgICAgZGV2aWNlX3R5cGU6IGFjdGl2aXR5LmRldmljZVR5cGUsXG4gICAgICB1c2VyOiBhY3Rpdml0eS51c2VyLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3AuZXZlbnRzLm1hcChjcmVhdGVBY3Rpdml0eSk7XG4gICAgLy8gcmV0dXJuIHJlc3AuZXZlbnRzLmZsYXRNYXAoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBzd2l0Y2ggKGV2ZW50LmFjdGlvbikge1xuICAgIC8vICAgICBjYXNlIFwicGluX3VubG9ja1wiOlxuICAgIC8vICAgICBjYXNlIFwibWFudWFsX3VubG9ja1wiOlxuICAgIC8vICAgICBjYXNlIFwibWFudWFsX2xvY2tcIjpcbiAgICAvLyAgICAgICByZXR1cm4gY3JlYXRlQWN0aXZpdHkoZXZlbnQpO1xuICAgIC8vICAgICBkZWZhdWx0OlxuICAgIC8vICAgICAgIHJldHVybiBudWxsO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0UmVmcmVzaFRva2VuKFxuICAgIGF1dGg6IElBdXRoZW50aWNhdGlvblxuICApOiBQcm9taXNlPHsgZGF0YTogYW55OyBoZWFkZXJzOiBhbnkgfT4ge1xuICAgIHJldHVybiB0aGlzLl9jYWxsQXBpKEFQSV9HRVRfSE9VU0VTX1VSTCwgXCJnZXRcIiwgbnVsbCwgYXV0aC5hY2Nlc3NfdG9rZW4sIHtcbiAgICAgIHRyYW5zZm9ybTogKGJvZHk6IGFueSwgcmVzcG9uc2U6IGFueSwgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgZGF0YTogYm9keSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==