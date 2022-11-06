export const HEADER_ACCEPT_VERSION = "Accept-Version";
export const HEADER_AUGUST_API_KEY = "x-august-api-key";
export const HEADER_KEASE_API_KEY = "x-kease-api-key";
export const HEADER_CONTENT_TYPE = "Content-Type";
export const HEADER_USER_AGENT = "User-Agent";
export const HEADER_AUGUST_ACCESS_TOKEN = "x-august-access-token";
export const HEADER_AUGUST_BRANDING = "x-august-branding";
export const HEADER_AUGUST_COUNTRY = "x-august-country";

export const HEADER_VALUE_API_KEY = "7cab4bbd-2693-4fc1-b99b-dec0fb20f9d4";
export const HEADER_VALUE_CONTENT_TYPE = "application/json; charset=UTF-8";
export const HEADER_VALUE_USER_AGENT = "August/Luna-22.17.0 (Android; SDK 31; gphone64_arm64)";
export const HEADER_VALUE_ACCEPT_VERSION = "0.0.1";
export const HEADER_VALUE_AUGUST_BRANDING = "august";
export const HEADER_VALUE_AUGUST_COUNTRY = "US";

export const CENTRAL_LOCK_ID = "82512D1A44004595B5DEB134E141A8F4";
export const DUNCAN_LOCK_ID = "5AEB8057813B4305B54D8311D1081FB8";
export const ALL_LOCK_IDS = [CENTRAL_LOCK_ID, DUNCAN_LOCK_ID];

export const LOCK_ID_TO_HOUSE_NAME: { [key: string]: string } = {
  [CENTRAL_LOCK_ID]: "Central",
  [DUNCAN_LOCK_ID]: "Duncan",
};
