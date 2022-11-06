import rp from "request-promise";

import {
  API_GET_SESSION_URL,
  API_SEND_VERIFICATION_CODE_URLS,
  API_VALIDATE_VERIFICATION_CODE_URLS,
  API_GET_PINS_URL,
  LoginMethod,
  API_GET_LOCKS_URL,
  API_GET_LOCK_URL,
  API_GET_HOUSES_URL,
  API_GET_HOUSE_ACTIVITIES_URL,
  API_GET_HOUSE_URL,
} from "./endpoints";
import {
  HEADER_ACCEPT_VERSION,
  HEADER_AUGUST_API_KEY,
  HEADER_KEASE_API_KEY,
  HEADER_CONTENT_TYPE,
  HEADER_USER_AGENT,
  HEADER_AUGUST_ACCESS_TOKEN,
  HEADER_VALUE_API_KEY,
  HEADER_VALUE_CONTENT_TYPE,
  HEADER_VALUE_USER_AGENT,
  HEADER_VALUE_ACCEPT_VERSION,
  HEADER_VALUE_AUGUST_BRANDING,
  HEADER_AUGUST_BRANDING,
  HEADER_AUGUST_COUNTRY,
  HEADER_VALUE_AUGUST_COUNTRY,
} from "./constants";
import {
  IAuthentication,
  LockResponse,
  Pin,
  PinResponse,
  LockDetail,
  Activity,
  House,
  ActivityResponse,
  ActivityEvent,
} from "august";
import moment, { Moment } from "moment";
import { millisecondsToDate } from "../helpers/dates";

export class API {
  async _callApi(
    url: string,
    method: string,
    data: any,
    accessToken: string | null = null,
    opts: any = {}
  ) {
    let options: rp.Options = {
      uri: url,
      headers: {
        [HEADER_AUGUST_API_KEY]: HEADER_VALUE_API_KEY,
        [HEADER_CONTENT_TYPE]: HEADER_VALUE_CONTENT_TYPE,
        [HEADER_USER_AGENT]: HEADER_VALUE_USER_AGENT,
        [HEADER_AUGUST_BRANDING]: HEADER_VALUE_AUGUST_BRANDING,
        [HEADER_AUGUST_COUNTRY]: HEADER_VALUE_AUGUST_COUNTRY,
      },
      method,
      json: true,
    };
    if (opts.version != null) {
      options.headers[HEADER_ACCEPT_VERSION] = opts.version;
      delete opts.version;
    } else {
      options.headers[HEADER_ACCEPT_VERSION] = HEADER_VALUE_ACCEPT_VERSION;
    }

    options = {
      ...options,
      ...opts,
    };

    if (accessToken !== null) {
      options = {
        ...options,
        headers: {
          ...options.headers,
          [HEADER_AUGUST_ACCESS_TOKEN]: accessToken,
        },
      };
    }

    if (data != null) {
      options = {
        ...options,
        body: data,
      };
    }

    return rp(options);
  }

  async getSession(install_id: string, identifier: string, password: string) {
    const resp = await this._callApi(
      API_GET_SESSION_URL,
      "post",
      {
        installId: install_id,
        identifier: identifier,
        password: password,
      },
      null,
      {
        transform: (body: any, response: any, resolveWithFullResponse: any) => {
          return {
            headers: response.headers,
            data: body,
          };
        },
      }
    );
    return resp;
  }

  async sendVerificationCode(
    access_token: string,
    login_method: LoginMethod,
    username: string
  ) {
    const resp = await this._callApi(
      API_SEND_VERIFICATION_CODE_URLS[login_method],
      "post",
      { value: username },
      access_token
    );
    return resp;
  }

  async validateVerificationCode(
    access_token: string,
    login_method: LoginMethod,
    username: string,
    verification_code: number
  ) {
    const resp = await this._callApi(
      API_VALIDATE_VERIFICATION_CODE_URLS[login_method],
      "post",
      {
        [login_method]: username,
        code: verification_code.toString(),
      },
      access_token
    );
    return resp;
  }

  async refreshToken() {
    return;
  }

  async getHouses(auth: IAuthentication): Promise<Array<House>> {
    return this._callApi(API_GET_HOUSES_URL, "get", null, auth.access_token);
  }

  async getHouse(auth: IAuthentication, houseId: string): Promise<House> {
    return this._callApi(
      API_GET_HOUSE_URL(houseId),
      "get",
      null,
      auth.access_token
    );
  }

  async getLocks(auth: IAuthentication): Promise<LockResponse> {
    return this._callApi(API_GET_LOCKS_URL, "get", null, auth.access_token);
  }

  async getLockDetail(
    auth: IAuthentication,
    lock_id: string
  ): Promise<LockDetail> {
    return this._callApi(
      API_GET_LOCK_URL(lock_id),
      "get",
      null,
      auth.access_token
    );
  }

  async getPins(lock_id: string, auth: IAuthentication): Promise<PinResponse> {
    return this._callApi(
      API_GET_PINS_URL(lock_id),
      "get",
      null,
      auth.access_token
    );
  }

  async getHouseActivities(
    auth: IAuthentication,
    house_id: string
  ): Promise<Array<Activity>> {
    const resp: ActivityResponse = await this._callApi(
      API_GET_HOUSE_ACTIVITIES_URL(house_id),
      "get",
      { limit: 100 },
      auth.access_token,
      {
        version: "4.0.0",
      }
    );

    const createActivity = (activity: ActivityEvent): Activity => ({
      activity_type: "lock_operation",
      activity_id: activity.id,
      house_id: "",
      activity_time_raw: activity.timestamp,
      activity_time: millisecondsToDate(activity.timestamp),
      action: activity.action,
      device_id: activity.deviceID,
      device_type: activity.deviceType,
      user: activity.user,
    });

    return resp.events.map(createActivity);
    // return resp.events.flatMap((event) => {
    //   switch (event.action) {
    //     case "pin_unlock":
    //     case "manual_unlock":
    //     case "manual_lock":
    //       return createActivity(event);
    //     default:
    //       return null;
    //   }
    // });
  }

  async getRefreshToken(
    auth: IAuthentication
  ): Promise<{ data: any; headers: any }> {
    return this._callApi(API_GET_HOUSES_URL, "get", null, auth.access_token, {
      transform: (body: any, response: any, resolveWithFullResponse: any) => {
        return {
          headers: response.headers,
          data: body,
        };
      },
    });
  }
}
