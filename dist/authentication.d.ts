declare const REQUIRES_AUTHENTICATION = "requires_authentication";
declare const REQUIRES_VALIDATION = "requires_validation";
declare const AUTHENTICATED = "authenticated";
declare const BAD_PASSWORD = "bad_password";
declare type AuthenticationStateTypes = typeof REQUIRES_AUTHENTICATION | typeof REQUIRES_VALIDATION | typeof AUTHENTICATED | typeof BAD_PASSWORD;
interface IAuthentication {
    state: AuthenticationStateTypes;
    install_id?: string;
    access_token?: string;
    access_token_expires?: string;
}
import { API } from "./api";
export declare class Authenticator {
    access_token_cache: string;
    api: API;
    _login_method: any;
    _username: string;
    _password: string;
    _install_id: string;
    access_token: string;
    access_token_expires: string;
    authentication: IAuthentication;
    constructor(api: any, login_method: any, username: string, password: string);
    authenticate(): Promise<IAuthentication>;
    send_verification_code(): Promise<void>;
    validate_verification_code(verification_code: number): Promise<string>;
    _get_cache_authentication(): IAuthentication | null;
    _cache_authentication(): Promise<void>;
    private refresh_token;
    private process_refreshed_access_token;
    private should_refresh;
}
export {};
