import moment from "moment";

import { API } from "./api";
import { ALL_LOCK_IDS, LOCK_ID_TO_HOUSE_NAME } from "./constants";
import { IAuthentication, Pin, LockDetail, House, Activity } from "../types";
import { Authenticator } from "./authentication";
import { AUGUST_USERNAME, AUGUST_PASSWORD } from "./env";
import { isSameDate } from "./helpers/dates";

export interface IAugust {
  api: API;
  _auth: IAuthentication;

  getAuth(): Promise<IAuthentication>;
  getAuthCode(): Promise<any>;
  submitAuthCode(authCode: number): Promise<string>;

  getPinsinDateRange(
    startDate: moment.Moment,
    endDate: moment.Moment,
    lockIds?: Array<string>
  ): Promise<Array<Pin>>;
  getPinsForDay(day: moment.Moment, lockId: string): Promise<Array<Pin>>;
  getLockDetail(lockId?: string): Promise<LockDetail>;
  getPins(lockId: string): Promise<Array<Pin>>;
  getHouse(houseId: string): Promise<House>;
  getHouses(): Promise<Array<House>>;
  getHouseByName(houseName: "Duncan" | "Airbnb"): Promise<House>;
  getHouseActivities(houseId: string): Promise<Array<Activity>>;
  // hasPersonEntered(houseID: string, limit: number): Promise<Array<Activity>>;
}

export class August implements IAugust {
  api: API;
  _auth: IAuthentication;
  isAuthenticated: Boolean;

  constructor() {
    this.api = new API();
  }

  getAuth = async () => {
    if (this._auth == null) {
      const authenticator = new Authenticator(
        this.api,
        "email",
        AUGUST_USERNAME,
        AUGUST_PASSWORD
      );
      const auth = await authenticator.authenticate();
      this._auth = auth;
    }
    return this._auth;
  };

  getLockDetail = async (
    lockId: string = "82512D1A44004595B5DEB134E141A8F4"
  ) => {
    const auth = await this.getAuth();
    return this.api.getLockDetail(auth, lockId);
  };

  getHouse = async (houseId: string) => {
    const auth = await this.getAuth();
    return this.api.getHouse(auth, houseId);
  };

  getHouses = async () => {
    const auth = await this.getAuth();
    return this.api.getHouses(auth);
  };

  getHouseActivities = async (houseId: string): Promise<Array<Activity>> => {
    const auth = await this.getAuth();
    return this.api.getHouseActivities(auth, houseId);
  };

  getHouseByName = async (houseName: "Duncan" | "Airbnb"): Promise<House> => {
    const houses = await this.getHouses();
    return houses.find((house) => house.HouseName === houseName);
  };

  getPinsinDateRange = async (
    startDate: moment.Moment,
    endDate: moment.Moment,
    lockIds?: Array<string>
  ) => {
    console.log("these are the lockids", lockIds);
    if (lockIds == null) {
      lockIds = ALL_LOCK_IDS;
    }

    let pinsToReturn: Array<Pin> = [];
    const auth = await this.getAuth();
    const getPinsPromise = Promise.all(
      lockIds.map((lockId) => this.api.getPins(lockId, auth))
    );

    const allPins = await getPinsPromise;
    for (const pins of allPins) {
      pinsToReturn = [
        ...pinsToReturn,
        ...pins.loaded.filter(
          (pin) =>
            moment(pin.accessStartTime).startOf("day") >=
              startDate.startOf("day") &&
            moment(pin.accessStartTime).endOf("day") <= endDate.endOf("day") &&
            pin.accessType == "temporary"
        ),
      ];
    }
    pinsToReturn.forEach(
      (p) => (p.houseName = LOCK_ID_TO_HOUSE_NAME[p.lockID])
    );
    return pinsToReturn;
  };

  getPinsForDay = async (day: moment.Moment, lockId: string) => {
    const auth = await this.getAuth();
    const pins = await this.api.getPins(lockId, auth);
    return pins.loaded.filter(
      (pin) =>
        isSameDate(pin.accessStartTime, day) && pin.accessType == "temporary"
    );
  };
  getPins = async (lockId: string): Promise<Array<Pin>> => {
    const auth = await this.getAuth();
    const pins = await this.api.getPins(lockId, auth);
    return pins.loaded;
  };

  getAuthCode = async () => {
    const authenticator = new Authenticator(
      this.api,
      "email",
      AUGUST_USERNAME,
      AUGUST_PASSWORD
    );
    const auth = await authenticator.authenticate();
    return authenticator.send_verification_code();
  };

  submitAuthCode = async (authCode: number): Promise<string> => {
    const authenticator = new Authenticator(
      this.api,
      "email",
      AUGUST_USERNAME,
      AUGUST_PASSWORD
    );
    const auth = await authenticator.authenticate();
    return authenticator.validate_verification_code(authCode);
  };
}
