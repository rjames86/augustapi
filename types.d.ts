import * as moment from "moment";

export const REQUIRES_AUTHENTICATION = "requires_authentication";
export const REQUIRES_VALIDATION = "requires_validation";
export const AUTHENTICATED = "authenticated";
export const BAD_PASSWORD = "bad_password";

export type AuthenticationStateTypes =
  | typeof REQUIRES_AUTHENTICATION
  | typeof REQUIRES_VALIDATION
  | typeof AUTHENTICATED
  | typeof BAD_PASSWORD;

export interface IAuthentication {
  state: AuthenticationStateTypes;
  install_id?: any;
  access_token?: string;
  access_token_expires?: string;
}
export class IAuthenticator {
  constructor(
    api: any,
    login_method: any,
    username: string,
    password: string,
    access_token_cache: Record<string, unknown>
  );
  authenticate(): Promise<IAuthentication>;
  send_verification_code(): void;
  validate_verification_code(verification_code: string): Promise<string>;
  _cache_authentication(): void;
}

interface LockStatus {
  status: string;
  dateTime: string;
  isLockedStatusChanged: boolean;
  valid: boolean;
}

interface House {
  HouseID: string;
  HouseName: "Airbnb" | "Duncan";
  type: string;
}

interface KeyPad {
  _id: string;
  serialNumber: string;
  lockID: string;
  currentFirmwareVersion: string;
  battery: Record<string, unknown>;
  batteryLevel: string;
  batteryRaw: number;
}

export interface LockDetail {
  Type: string;
  Created: string;
  Updated: string;
  LockID: string;
  HouseID: string;
  HouseName: string;
  Calibrated: boolean;
  skuNumber: string;
  timeZone: string;
  battery: number;
  supportsEntryCodes: boolean;
  SerialNumber: string;
  LockStatus: LockStatus;
  keypad: KeyPad;
  pins: PinResponse;
}

export interface LockData {
  LockName: string;
  UserType: string;
  macAddress: string;
  HouseID: string;
  HouseName: string;
}

export interface LockResponse {
  [key: string]: LockData;
}

export interface Pin {
  _id: string;
  lockID: string;
  userID: string;
  state: string;
  pin: string;
  slot: number;
  accessType: string;
  callingUserID: string;
  apiKey: string;
  accessStartTime: string;
  accessEndTime: string;
  accessTimes: string;
  createdAt: string;
  updatedAt: string;
  loadedDate: string;
  firstName: string;
  lastName: string;
  unverified: true;
  partnerUserID?: number;
  houseName?: string; // custom value set from method calls
}

interface PinResponse {
  created: Array<Pin>;
  loaded: Array<Pin>;
  disabled: Array<Pin>;
  disabling: Array<Pin>;
  enabling: Array<Pin>;
  deleting: Array<Pin>;
  updating: Array<Pin>;
}

interface User {
  UserID: string;
  FirstName: string;
  LastName: string;
}

export interface Activity {
  activity_type: "lock_operation";
  activity_id: string;
  house_id: "";
  activity_time_raw: number;
  activity_time: moment.Moment;
  action: string;
  device_id: string;
  device_type: string;
  user?: User;
}

// The raw API activity response
export interface ActivityEvent {
  id: string;
  timestamp: number;
  icon: string;
  action: string;
  deviceID: string;
  deviceType: string;
  title: string;
  user?: User;
}
export interface ActivityResponse {
  events: ActivityEvent[];
}
