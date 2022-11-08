export declare const API_GET_SESSION_URL: string;
export declare const API_SEND_VERIFICATION_CODE_URLS: {
    phone: string;
    email: string;
};
export declare type LoginMethod = "phone" | "email";
declare type ApiValidateVerificationCode = {
    [key in LoginMethod]: string;
};
export declare const API_VALIDATE_VERIFICATION_CODE_URLS: ApiValidateVerificationCode;
export declare const API_GET_HOUSE_ACTIVITIES_URL: (house_id: string) => string;
export declare const API_GET_DOORBELLS_URL: string;
export declare const API_GET_DOORBELL_URL: (doorbell_id: string) => string;
export declare const API_WAKEUP_DOORBELL_URL: (doorbell_id: string) => string;
export declare const API_GET_HOUSES_URL: string;
export declare const API_GET_HOUSE_URL: (house_id: string) => string;
export declare const API_GET_LOCKS_URL: string;
export declare const API_GET_LOCK_URL: (lock_id: string) => string;
export declare const API_GET_LOCK_STATUS_URL: (lock_id: string) => string;
export declare const API_GET_PINS_URL: (lock_id: string) => string;
export declare const API_LOCK_URL: (lock_id: string) => string;
export declare const API_UNLOCK_URL: (lock_id: string) => string;
export {};
