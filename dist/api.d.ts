import { LoginMethod } from "./endpoints";
import { IAuthentication, LockResponse, PinResponse, LockDetail, Activity, House } from "../types";
export declare class API {
    _callApi(url: string, method: string, data: any, accessToken?: string | null, opts?: any): Promise<any>;
    getSession(install_id: string, identifier: string, password: string): Promise<any>;
    sendVerificationCode(access_token: string, login_method: LoginMethod, username: string): Promise<any>;
    validateVerificationCode(access_token: string, login_method: LoginMethod, username: string, verification_code: number): Promise<any>;
    refreshToken(): Promise<void>;
    getHouses(auth: IAuthentication): Promise<Array<House>>;
    getHouse(auth: IAuthentication, houseId: string): Promise<House>;
    getLocks(auth: IAuthentication): Promise<LockResponse>;
    getLockDetail(auth: IAuthentication, lock_id: string): Promise<LockDetail>;
    getPins(lock_id: string, auth: IAuthentication): Promise<PinResponse>;
    getHouseActivities(auth: IAuthentication, house_id: string): Promise<Array<Activity>>;
    getRefreshToken(auth: IAuthentication): Promise<{
        data: any;
        headers: any;
    }>;
}
