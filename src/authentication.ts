import * as UUID from "uuid";
import * as fs from "fs";
const REQUIRES_AUTHENTICATION = "requires_authentication";
const REQUIRES_VALIDATION = "requires_validation";
const AUTHENTICATED = "authenticated";
const BAD_PASSWORD = "bad_password";

type AuthenticationStateTypes =
  | typeof REQUIRES_AUTHENTICATION
  | typeof REQUIRES_VALIDATION
  | typeof AUTHENTICATED
  | typeof BAD_PASSWORD;

interface IAuthentication {
  state: AuthenticationStateTypes;
  install_id?: string;
  access_token?: string;
  access_token_expires?: string;
}

import { API } from "./api";
import { HEADER_AUGUST_ACCESS_TOKEN } from "./constants";
import * as moment from "moment";
import { daysBetween } from "./helpers/dates";

const ValidationResult = {
  VALIDATED: "validated",
  INVALID_VERIFICATION_CODE: "invalid_verification_code",
};

/**
 *
 * API
 *
 */

const createAuthentication = (
  state: AuthenticationStateTypes,
  install_id: string | null = null,
  access_token: string,
  access_token_expires: string
): IAuthentication => ({
  state,
  install_id: install_id != null ? install_id : UUID.v4(),
  access_token,
  access_token_expires,
});

export class Authenticator {
  access_token_cache = "august_cache.json";
  api: API;
  _login_method: any;
  _username: string;
  _password: string;
  _install_id: string;
  access_token: string;
  access_token_expires: string;
  authentication: IAuthentication;

  constructor(api: any, login_method: any, username: string, password: string) {
    this.api = api;
    this._login_method = login_method;
    this._username = username;
    this._password = password;
    this._install_id = UUID.v4();

    const cache = this._get_cache_authentication();

    if (cache === null) {
      this.authentication = {
        state: REQUIRES_AUTHENTICATION,
        install_id: this._install_id,
      };
    } else if (moment(cache.access_token_expires).isBefore(moment())) {
      this.authentication = {
        state: REQUIRES_AUTHENTICATION,
        install_id: this._install_id,
      };
    } else {
      this.authentication = createAuthentication(
        cache.state,
        cache.install_id,
        cache.access_token!,
        cache.access_token_expires!
      );
    }
  }

  async authenticate(): Promise<IAuthentication> {
    if (this.authentication.state === AUTHENTICATED) {
      if (this.should_refresh()) {
        this.refresh_token();
      }
      return this.authentication;
    }

    const identifier = `${this._login_method}:${this._username}`;
    const install_id = this.authentication.install_id;
    const { data, headers } = await this.api.getSession(
      install_id!,
      identifier,
      this._password
    );
    const access_token = headers[HEADER_AUGUST_ACCESS_TOKEN];
    const access_token_expires = data["expiresAt"];
    const v_password = data["vPassword"];
    const v_install_id = data["vInstallId"];

    let state: AuthenticationStateTypes;
    if (!v_password) {
      state = BAD_PASSWORD;
    } else if (!v_install_id) {
      state = REQUIRES_VALIDATION;
    } else {
      state = AUTHENTICATED;
    }

    this.authentication = {
      state,
      install_id,
      access_token,
      access_token_expires,
    };

    if (state === AUTHENTICATED) {
      await this._cache_authentication();
    }

    return this.authentication;
  }

  async send_verification_code(): Promise<void> {
    await this.api.sendVerificationCode(
      this.authentication.access_token!,
      this._login_method,
      this._username
    );
  }
  async validate_verification_code(verification_code: number): Promise<string> {
    try {
      await this.api.validateVerificationCode(
        this.authentication.access_token!,
        this._login_method,
        this._username,
        verification_code
      );
      return ValidationResult.VALIDATED;
    } catch (err) {
      return ValidationResult.INVALID_VERIFICATION_CODE;
    }
  }

  _get_cache_authentication(): IAuthentication | null {
    if (fs.existsSync(this.access_token_cache)) {
      const data = fs.readFileSync(this.access_token_cache, "utf8");
      return JSON.parse(data);
    }
    return null;
  }

  async _cache_authentication() {
    fs.writeFile(
      this.access_token_cache,
      JSON.stringify(this.authentication),
      () => null
    );
  }

  private async refresh_token() {
    const refreshedToken = await this.api.getRefreshToken(this.authentication);
    await this.process_refreshed_access_token(
      refreshedToken.headers[HEADER_AUGUST_ACCESS_TOKEN]
    );
    this._cache_authentication();
  }

  private async process_refreshed_access_token(refreshed_token: string) {
    const jwtParts = refreshed_token.split(".");
    const jwtClaims = JSON.parse(
      Buffer.from(jwtParts[1] + "===", "base64").toString()
    );

    this.authentication = {
      ...this.authentication,
      access_token: refreshed_token,
      access_token_expires: moment(jwtClaims.expiresAt).utc(true).format(),
    };
    return this.authentication;
  }

  private should_refresh() {
    return (
      this.authentication.state == AUTHENTICATED &&
      daysBetween(this.authentication.access_token_expires!) < 7
    );
  }
}
