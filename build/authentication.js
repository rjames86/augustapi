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
exports.Authenticator = void 0;
var UUID = require("uuid");
var fs = require("fs");
var REQUIRES_AUTHENTICATION = "requires_authentication";
var REQUIRES_VALIDATION = "requires_validation";
var AUTHENTICATED = "authenticated";
var BAD_PASSWORD = "bad_password";
var constants_1 = require("./constants");
var moment = require("moment");
var dates_1 = require("./helpers/dates");
var ValidationResult = {
    VALIDATED: "validated",
    INVALID_VERIFICATION_CODE: "invalid_verification_code"
};
/**
 *
 * API
 *
 */
var createAuthentication = function (state, install_id, access_token, access_token_expires) {
    if (install_id === void 0) { install_id = null; }
    return ({
        state: state,
        install_id: install_id != null ? install_id : UUID.v4(),
        access_token: access_token,
        access_token_expires: access_token_expires
    });
};
var Authenticator = /** @class */ (function () {
    function Authenticator(api, login_method, username, password) {
        this.access_token_cache = "august_cache.json";
        this.api = api;
        this._login_method = login_method;
        this._username = username;
        this._password = password;
        this._install_id = UUID.v4();
        var cache = this._get_cache_authentication();
        if (cache === null) {
            this.authentication = {
                state: REQUIRES_AUTHENTICATION,
                install_id: this._install_id
            };
        }
        else if (moment(cache.access_token_expires).isBefore(moment())) {
            this.authentication = {
                state: REQUIRES_AUTHENTICATION,
                install_id: this._install_id
            };
        }
        else {
            this.authentication = createAuthentication(cache.state, cache.install_id, cache.access_token, cache.access_token_expires);
        }
    }
    Authenticator.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var identifier, install_id, _a, data, headers, access_token, access_token_expires, v_password, v_install_id, state;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.authentication.state === AUTHENTICATED) {
                            if (this.should_refresh()) {
                                this.refresh_token();
                            }
                            return [2 /*return*/, this.authentication];
                        }
                        identifier = "".concat(this._login_method, ":").concat(this._username);
                        install_id = this.authentication.install_id;
                        return [4 /*yield*/, this.api.getSession(install_id, identifier, this._password)];
                    case 1:
                        _a = _b.sent(), data = _a.data, headers = _a.headers;
                        access_token = headers[constants_1.HEADER_AUGUST_ACCESS_TOKEN];
                        access_token_expires = data["expiresAt"];
                        v_password = data["vPassword"];
                        v_install_id = data["vInstallId"];
                        if (!v_password) {
                            state = BAD_PASSWORD;
                        }
                        else if (!v_install_id) {
                            state = REQUIRES_VALIDATION;
                        }
                        else {
                            state = AUTHENTICATED;
                        }
                        this.authentication = {
                            state: state,
                            install_id: install_id,
                            access_token: access_token,
                            access_token_expires: access_token_expires
                        };
                        if (!(state === AUTHENTICATED)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._cache_authentication()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, this.authentication];
                }
            });
        });
    };
    Authenticator.prototype.send_verification_code = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.sendVerificationCode(this.authentication.access_token, this._login_method, this._username)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Authenticator.prototype.validate_verification_code = function (verification_code) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.api.validateVerificationCode(this.authentication.access_token, this._login_method, this._username, verification_code)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ValidationResult.VALIDATED];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, ValidationResult.INVALID_VERIFICATION_CODE];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Authenticator.prototype._get_cache_authentication = function () {
        if (fs.existsSync(this.access_token_cache)) {
            var data = fs.readFileSync(this.access_token_cache, "utf8");
            return JSON.parse(data);
        }
        return null;
    };
    Authenticator.prototype._cache_authentication = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs.writeFile(this.access_token_cache, JSON.stringify(this.authentication), function () { return null; });
                return [2 /*return*/];
            });
        });
    };
    Authenticator.prototype.refresh_token = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getRefreshToken(this.authentication)];
                    case 1:
                        refreshedToken = _a.sent();
                        return [4 /*yield*/, this.process_refreshed_access_token(refreshedToken.headers[constants_1.HEADER_AUGUST_ACCESS_TOKEN])];
                    case 2:
                        _a.sent();
                        this._cache_authentication();
                        return [2 /*return*/];
                }
            });
        });
    };
    Authenticator.prototype.process_refreshed_access_token = function (refreshed_token) {
        return __awaiter(this, void 0, void 0, function () {
            var jwtParts, jwtClaims;
            return __generator(this, function (_a) {
                jwtParts = refreshed_token.split(".");
                jwtClaims = JSON.parse(Buffer.from(jwtParts[1] + "===", "base64").toString());
                this.authentication = __assign(__assign({}, this.authentication), { access_token: refreshed_token, access_token_expires: moment(jwtClaims.expiresAt).utc(true).format() });
                return [2 /*return*/, this.authentication];
            });
        });
    };
    Authenticator.prototype.should_refresh = function () {
        return (this.authentication.state == AUTHENTICATED &&
            (0, dates_1.daysBetween)(this.authentication.access_token_expires) < 7);
    };
    return Authenticator;
}());
exports.Authenticator = Authenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBNkI7QUFDN0IsdUJBQXlCO0FBQ3pCLElBQU0sdUJBQXVCLEdBQUcseUJBQXlCLENBQUM7QUFDMUQsSUFBTSxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztBQUNsRCxJQUFNLGFBQWEsR0FBRyxlQUFlLENBQUM7QUFDdEMsSUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBZ0JwQyx5Q0FBeUQ7QUFDekQsK0JBQWlDO0FBQ2pDLHlDQUE4QztBQUU5QyxJQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLFNBQVMsRUFBRSxXQUFXO0lBQ3RCLHlCQUF5QixFQUFFLDJCQUEyQjtDQUN2RCxDQUFDO0FBRUY7Ozs7R0FJRztBQUVILElBQU0sb0JBQW9CLEdBQUcsVUFDM0IsS0FBK0IsRUFDL0IsVUFBZ0MsRUFDaEMsWUFBb0IsRUFDcEIsb0JBQTRCO0lBRjVCLDJCQUFBLEVBQUEsaUJBQWdDO0lBR1osT0FBQSxDQUFDO1FBQ3JCLEtBQUssT0FBQTtRQUNMLFVBQVUsRUFBRSxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDdkQsWUFBWSxjQUFBO1FBQ1osb0JBQW9CLHNCQUFBO0tBQ3JCLENBQUM7QUFMb0IsQ0FLcEIsQ0FBQztBQUVIO0lBV0UsdUJBQVksR0FBUSxFQUFFLFlBQWlCLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQjtRQVYzRSx1QkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztRQVd2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLElBQUksQ0FB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QUFFLENBQUM7Ozs7O0tBQzlCO0lBRWEsc0RBQThCLEdBQTVDLFVBQTZDLGVBQXVCOzs7O2dCQUM1RCxRQUFRLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDdEQsQ0FBQztnQkFFRixJQUFJLENBQUMsY0FBYyx5QkFDZCxJQUFJLENBQUMsY0FBYyxLQUN0QixZQUFZLEVBQUUsZUFBZSxFQUM3QixvQkFBb0IsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FDckUsQ0FBQztnQkFDRixzQkFBTyxJQUFJLENBQUMsY0FBYyxFQUFDOzs7S0FDNUI7SUFFTyxzQ0FBYyxHQUF0QjtRQUNFLE9BQU8sQ0FDTCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSSxhQUFhO1lBQzFDLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUMzRCxDQUFDO0lBQ0osQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXBKRCxJQW9KQztBQXBKWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFVVSUQgZnJvbSBcInV1aWRcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuY29uc3QgUkVRVUlSRVNfQVVUSEVOVElDQVRJT04gPSBcInJlcXVpcmVzX2F1dGhlbnRpY2F0aW9uXCI7XG5jb25zdCBSRVFVSVJFU19WQUxJREFUSU9OID0gXCJyZXF1aXJlc192YWxpZGF0aW9uXCI7XG5jb25zdCBBVVRIRU5USUNBVEVEID0gXCJhdXRoZW50aWNhdGVkXCI7XG5jb25zdCBCQURfUEFTU1dPUkQgPSBcImJhZF9wYXNzd29yZFwiO1xuXG50eXBlIEF1dGhlbnRpY2F0aW9uU3RhdGVUeXBlcyA9XG4gIHwgdHlwZW9mIFJFUVVJUkVTX0FVVEhFTlRJQ0FUSU9OXG4gIHwgdHlwZW9mIFJFUVVJUkVTX1ZBTElEQVRJT05cbiAgfCB0eXBlb2YgQVVUSEVOVElDQVRFRFxuICB8IHR5cGVvZiBCQURfUEFTU1dPUkQ7XG5cbmludGVyZmFjZSBJQXV0aGVudGljYXRpb24ge1xuICBzdGF0ZTogQXV0aGVudGljYXRpb25TdGF0ZVR5cGVzO1xuICBpbnN0YWxsX2lkPzogc3RyaW5nO1xuICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmc7XG4gIGFjY2Vzc190b2tlbl9leHBpcmVzPzogc3RyaW5nO1xufVxuXG5pbXBvcnQgeyBBUEkgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IEhFQURFUl9BVUdVU1RfQUNDRVNTX1RPS0VOIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHsgZGF5c0JldHdlZW4gfSBmcm9tIFwiLi9oZWxwZXJzL2RhdGVzXCI7XG5cbmNvbnN0IFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gIFZBTElEQVRFRDogXCJ2YWxpZGF0ZWRcIixcbiAgSU5WQUxJRF9WRVJJRklDQVRJT05fQ09ERTogXCJpbnZhbGlkX3ZlcmlmaWNhdGlvbl9jb2RlXCIsXG59O1xuXG4vKipcbiAqXG4gKiBBUElcbiAqXG4gKi9cblxuY29uc3QgY3JlYXRlQXV0aGVudGljYXRpb24gPSAoXG4gIHN0YXRlOiBBdXRoZW50aWNhdGlvblN0YXRlVHlwZXMsXG4gIGluc3RhbGxfaWQ6IHN0cmluZyB8IG51bGwgPSBudWxsLFxuICBhY2Nlc3NfdG9rZW46IHN0cmluZyxcbiAgYWNjZXNzX3Rva2VuX2V4cGlyZXM6IHN0cmluZ1xuKTogSUF1dGhlbnRpY2F0aW9uID0+ICh7XG4gIHN0YXRlLFxuICBpbnN0YWxsX2lkOiBpbnN0YWxsX2lkICE9IG51bGwgPyBpbnN0YWxsX2lkIDogVVVJRC52NCgpLFxuICBhY2Nlc3NfdG9rZW4sXG4gIGFjY2Vzc190b2tlbl9leHBpcmVzLFxufSk7XG5cbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdG9yIHtcbiAgYWNjZXNzX3Rva2VuX2NhY2hlID0gXCJhdWd1c3RfY2FjaGUuanNvblwiO1xuICBhcGk6IEFQSTtcbiAgX2xvZ2luX21ldGhvZDogYW55O1xuICBfdXNlcm5hbWU6IHN0cmluZztcbiAgX3Bhc3N3b3JkOiBzdHJpbmc7XG4gIF9pbnN0YWxsX2lkOiBzdHJpbmc7XG4gIGFjY2Vzc190b2tlbjogc3RyaW5nO1xuICBhY2Nlc3NfdG9rZW5fZXhwaXJlczogc3RyaW5nO1xuICBhdXRoZW50aWNhdGlvbjogSUF1dGhlbnRpY2F0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGFwaTogYW55LCBsb2dpbl9tZXRob2Q6IGFueSwgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMuX2xvZ2luX21ldGhvZCA9IGxvZ2luX21ldGhvZDtcbiAgICB0aGlzLl91c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMuX3Bhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgdGhpcy5faW5zdGFsbF9pZCA9IFVVSUQudjQoKTtcblxuICAgIGNvbnN0IGNhY2hlID0gdGhpcy5fZ2V0X2NhY2hlX2F1dGhlbnRpY2F0aW9uKCk7XG5cbiAgICBpZiAoY2FjaGUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXV0aGVudGljYXRpb24gPSB7XG4gICAgICAgIHN0YXRlOiBSRVFVSVJFU19BVVRIRU5USUNBVElPTixcbiAgICAgICAgaW5zdGFsbF9pZDogdGhpcy5faW5zdGFsbF9pZCxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChtb21lbnQoY2FjaGUuYWNjZXNzX3Rva2VuX2V4cGlyZXMpLmlzQmVmb3JlKG1vbWVudCgpKSkge1xuICAgICAgdGhpcy5hdXRoZW50aWNhdGlvbiA9IHtcbiAgICAgICAgc3RhdGU6IFJFUVVJUkVTX0FVVEhFTlRJQ0FUSU9OLFxuICAgICAgICBpbnN0YWxsX2lkOiB0aGlzLl9pbnN0YWxsX2lkLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdXRoZW50aWNhdGlvbiA9IGNyZWF0ZUF1dGhlbnRpY2F0aW9uKFxuICAgICAgICBjYWNoZS5zdGF0ZSxcbiAgICAgICAgY2FjaGUuaW5zdGFsbF9pZCxcbiAgICAgICAgY2FjaGUuYWNjZXNzX3Rva2VuISxcbiAgICAgICAgY2FjaGUuYWNjZXNzX3Rva2VuX2V4cGlyZXMhXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGF1dGhlbnRpY2F0ZSgpOiBQcm9taXNlPElBdXRoZW50aWNhdGlvbj4ge1xuICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0aW9uLnN0YXRlID09PSBBVVRIRU5USUNBVEVEKSB7XG4gICAgICBpZiAodGhpcy5zaG91bGRfcmVmcmVzaCgpKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaF90b2tlbigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRpb247XG4gICAgfVxuXG4gICAgY29uc3QgaWRlbnRpZmllciA9IGAke3RoaXMuX2xvZ2luX21ldGhvZH06JHt0aGlzLl91c2VybmFtZX1gO1xuICAgIGNvbnN0IGluc3RhbGxfaWQgPSB0aGlzLmF1dGhlbnRpY2F0aW9uLmluc3RhbGxfaWQ7XG4gICAgY29uc3QgeyBkYXRhLCBoZWFkZXJzIH0gPSBhd2FpdCB0aGlzLmFwaS5nZXRTZXNzaW9uKFxuICAgICAgaW5zdGFsbF9pZCEsXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgdGhpcy5fcGFzc3dvcmRcbiAgICApO1xuICAgIGNvbnN0IGFjY2Vzc190b2tlbiA9IGhlYWRlcnNbSEVBREVSX0FVR1VTVF9BQ0NFU1NfVE9LRU5dO1xuICAgIGNvbnN0IGFjY2Vzc190b2tlbl9leHBpcmVzID0gZGF0YVtcImV4cGlyZXNBdFwiXTtcbiAgICBjb25zdCB2X3Bhc3N3b3JkID0gZGF0YVtcInZQYXNzd29yZFwiXTtcbiAgICBjb25zdCB2X2luc3RhbGxfaWQgPSBkYXRhW1widkluc3RhbGxJZFwiXTtcblxuICAgIGxldCBzdGF0ZTogQXV0aGVudGljYXRpb25TdGF0ZVR5cGVzO1xuICAgIGlmICghdl9wYXNzd29yZCkge1xuICAgICAgc3RhdGUgPSBCQURfUEFTU1dPUkQ7XG4gICAgfSBlbHNlIGlmICghdl9pbnN0YWxsX2lkKSB7XG4gICAgICBzdGF0ZSA9IFJFUVVJUkVTX1ZBTElEQVRJT047XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlID0gQVVUSEVOVElDQVRFRDtcbiAgICB9XG5cbiAgICB0aGlzLmF1dGhlbnRpY2F0aW9uID0ge1xuICAgICAgc3RhdGUsXG4gICAgICBpbnN0YWxsX2lkLFxuICAgICAgYWNjZXNzX3Rva2VuLFxuICAgICAgYWNjZXNzX3Rva2VuX2V4cGlyZXMsXG4gICAgfTtcblxuICAgIGlmIChzdGF0ZSA9PT0gQVVUSEVOVElDQVRFRCkge1xuICAgICAgYXdhaXQgdGhpcy5fY2FjaGVfYXV0aGVudGljYXRpb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hdXRoZW50aWNhdGlvbjtcbiAgfVxuXG4gIGFzeW5jIHNlbmRfdmVyaWZpY2F0aW9uX2NvZGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5hcGkuc2VuZFZlcmlmaWNhdGlvbkNvZGUoXG4gICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uLmFjY2Vzc190b2tlbiEsXG4gICAgICB0aGlzLl9sb2dpbl9tZXRob2QsXG4gICAgICB0aGlzLl91c2VybmFtZVxuICAgICk7XG4gIH1cbiAgYXN5bmMgdmFsaWRhdGVfdmVyaWZpY2F0aW9uX2NvZGUodmVyaWZpY2F0aW9uX2NvZGU6IG51bWJlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuYXBpLnZhbGlkYXRlVmVyaWZpY2F0aW9uQ29kZShcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGlvbi5hY2Nlc3NfdG9rZW4hLFxuICAgICAgICB0aGlzLl9sb2dpbl9tZXRob2QsXG4gICAgICAgIHRoaXMuX3VzZXJuYW1lLFxuICAgICAgICB2ZXJpZmljYXRpb25fY29kZVxuICAgICAgKTtcbiAgICAgIHJldHVybiBWYWxpZGF0aW9uUmVzdWx0LlZBTElEQVRFRDtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBWYWxpZGF0aW9uUmVzdWx0LklOVkFMSURfVkVSSUZJQ0FUSU9OX0NPREU7XG4gICAgfVxuICB9XG5cbiAgX2dldF9jYWNoZV9hdXRoZW50aWNhdGlvbigpOiBJQXV0aGVudGljYXRpb24gfCBudWxsIHtcbiAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLmFjY2Vzc190b2tlbl9jYWNoZSkpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5hY2Nlc3NfdG9rZW5fY2FjaGUsIFwidXRmOFwiKTtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIF9jYWNoZV9hdXRoZW50aWNhdGlvbigpIHtcbiAgICBmcy53cml0ZUZpbGUoXG4gICAgICB0aGlzLmFjY2Vzc190b2tlbl9jYWNoZSxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuYXV0aGVudGljYXRpb24pLFxuICAgICAgKCkgPT4gbnVsbFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlZnJlc2hfdG9rZW4oKSB7XG4gICAgY29uc3QgcmVmcmVzaGVkVG9rZW4gPSBhd2FpdCB0aGlzLmFwaS5nZXRSZWZyZXNoVG9rZW4odGhpcy5hdXRoZW50aWNhdGlvbik7XG4gICAgYXdhaXQgdGhpcy5wcm9jZXNzX3JlZnJlc2hlZF9hY2Nlc3NfdG9rZW4oXG4gICAgICByZWZyZXNoZWRUb2tlbi5oZWFkZXJzW0hFQURFUl9BVUdVU1RfQUNDRVNTX1RPS0VOXVxuICAgICk7XG4gICAgdGhpcy5fY2FjaGVfYXV0aGVudGljYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcHJvY2Vzc19yZWZyZXNoZWRfYWNjZXNzX3Rva2VuKHJlZnJlc2hlZF90b2tlbjogc3RyaW5nKSB7XG4gICAgY29uc3Qgand0UGFydHMgPSByZWZyZXNoZWRfdG9rZW4uc3BsaXQoXCIuXCIpO1xuICAgIGNvbnN0IGp3dENsYWltcyA9IEpTT04ucGFyc2UoXG4gICAgICBCdWZmZXIuZnJvbShqd3RQYXJ0c1sxXSArIFwiPT09XCIsIFwiYmFzZTY0XCIpLnRvU3RyaW5nKClcbiAgICApO1xuXG4gICAgdGhpcy5hdXRoZW50aWNhdGlvbiA9IHtcbiAgICAgIC4uLnRoaXMuYXV0aGVudGljYXRpb24sXG4gICAgICBhY2Nlc3NfdG9rZW46IHJlZnJlc2hlZF90b2tlbixcbiAgICAgIGFjY2Vzc190b2tlbl9leHBpcmVzOiBtb21lbnQoand0Q2xhaW1zLmV4cGlyZXNBdCkudXRjKHRydWUpLmZvcm1hdCgpLFxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRpb247XG4gIH1cblxuICBwcml2YXRlIHNob3VsZF9yZWZyZXNoKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uLnN0YXRlID09IEFVVEhFTlRJQ0FURUQgJiZcbiAgICAgIGRheXNCZXR3ZWVuKHRoaXMuYXV0aGVudGljYXRpb24uYWNjZXNzX3Rva2VuX2V4cGlyZXMhKSA8IDdcbiAgICApO1xuICB9XG59XG4iXX0=