const API_BASE_URL = "https://api-production.august.com";
export const API_GET_SESSION_URL = API_BASE_URL + "/session";
export const API_SEND_VERIFICATION_CODE_URLS = {
  phone: API_BASE_URL + "/validation/phone",
  email: API_BASE_URL + "/validation/email",
};

export type LoginMethod = "phone" | "email";

type ApiValidateVerificationCode = {
  [key in LoginMethod]: string;
};

export const API_VALIDATE_VERIFICATION_CODE_URLS: ApiValidateVerificationCode = {
  phone: API_BASE_URL + "/validate/phone",
  email: API_BASE_URL + "/validate/email",
};

export const API_GET_HOUSE_ACTIVITIES_URL = (house_id: string) =>
  API_BASE_URL + `/houses/${house_id}/activities`;
export const API_GET_DOORBELLS_URL = API_BASE_URL + "/users/doorbells/mine";
export const API_GET_DOORBELL_URL = (doorbell_id: string) =>
  API_BASE_URL + `/doorbells/${doorbell_id}`;
export const API_WAKEUP_DOORBELL_URL = (doorbell_id: string) =>
  API_BASE_URL + `/doorbells/${doorbell_id}/wakeup`;
export const API_GET_HOUSES_URL = API_BASE_URL + "/users/houses/mine";
export const API_GET_HOUSE_URL = (house_id: string) =>
  API_BASE_URL + `/houses/${house_id}`;
export const API_GET_LOCKS_URL = API_BASE_URL + "/users/locks/mine";
export const API_GET_LOCK_URL = (lock_id: string) =>
  API_BASE_URL + `/locks/${lock_id}`;
export const API_GET_LOCK_STATUS_URL = (lock_id: string) =>
  API_BASE_URL + `/locks/${lock_id}/status`;
export const API_GET_PINS_URL = (lock_id: string) =>
  API_BASE_URL + `/locks/${lock_id}/pins`;
export const API_LOCK_URL = (lock_id: string) =>
  API_BASE_URL + `/remoteoperate/${lock_id}/lock`;
export const API_UNLOCK_URL = (lock_id: string) =>
  API_BASE_URL + `/remoteoperate/${lock_id}/unlock`;
