import { CashInFields, CashOutFields, LinkBankAccountFields } from "./types";
export declare class TraxionPay {
    apiKey: string;
    secretKey: string;
    token: string;
    authHeaders: {};
    constructor(apiKey: string, secretKey: string);
    /**
     * Cash In enables merchants to receive money through the application.
     * Through this feature, merchants receive payments and store it in their in-app wallet.
     *
     * POST `https://devapi.traxionpay.com/payform-link`
     *
     * @param {object}   payload
     * @param {number}   payload.merchant_id
     * @param {string}   payload.merchant_ref_no
     * @param {string}   payload.merchant_additional_data
     * @param {number}   payload.amount
     * @param {string}   payload.description
     * @param {string}   payload.currency
     * @param {string}   payload.payment_method
     * @param {string}   payload.success_page_url
     * @param {string}   payload.cancel_page_url
     * @param {string}   payload.failure_page_url
     * @param {string}   payload.status_notification_url
     * @param {string}   payload.pending_page_url
     * @param {object}   payload.billing_details
     */
    cashIn(payload: CashInFields): Promise<any>;
    /**
     * Retrieves a list of usable banks.
     *
     * GET `https://devapi.traxionpay.com/banks/`
     */
    fetchBanks(): Promise<any>;
    /**
     * Retrieves a list of usable bank accounts.
     *
     * GET `https://devapi.traxionpay.com/payout/bank-account/`
     */
    fetchBankAccounts(): Promise<any>;
    /**
     * Links or creates a new bank account.
     *
     * POST `https://devapi.traxionpay.com/payout/bank-account/`
     *
     * @param {object}   payload
     * @param {string}   payload.bank
     * @param {string}   payload.bank_type     "savings" or "checkings"
     * @param {string}   payload.account_name
     * @param {string}   payload.account_number
     */
    linkBankAccount(payload: LinkBankAccountFields): Promise<any>;
    /**
     * Retrieves otp for `cashOut` method.
     *
     * POST `https://devapi.traxionpay.com/bank-payout/get-otp/`
     */
    fetchOTP(): Promise<any>;
    /**
     * The Cash Out feature allows merchants to physically retrieve the money stored in the in-app wallet.
     * To Cash Out, the merchant links a bank accout,
     * provides an OTP, and requests a payout to the bank.
     *
     * POST `https://devapi.traxionpay.com/payout/bank-payout/`
     *
     * @param {object}  payload
     * @param {string}  payload.OTP
     * @param {number}  payload.amount
     * @param {number}  payload.bank_account
     */
    cashOut(payload: CashOutFields): Promise<any>;
}
