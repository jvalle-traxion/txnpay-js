"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraxionPay = void 0;
var CryptoJS = require("crypto-js");
var qs = require("querystring");
const axios_1 = require("axios");
const js_base64_1 = require("js-base64");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
class TraxionPay {
    constructor(apiKey, secretKey) {
        if (apiKey && secretKey) {
            this.apiKey = apiKey;
            this.secretKey = secretKey;
            this.token = utils_1.generateToken(secretKey);
            this.authHeaders = {
                Authorization: `Basic ${this.token}`,
                "Content-Type": "application/json",
            };
        }
        else {
            throw Error("`apiKey` and `secretKey` must not be null.");
        }
    }
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
    cashIn(payload) {
        var _a;
        const billing_details = (_a = payload.billing_details) !== null && _a !== void 0 ? _a : {};
        delete payload.billing_details;
        const cashInDetails = payload;
        let validBillingDetails = utils_1.getValidatedPayload(billing_details, constants_1.KEYS.billingDetails);
        let validCashInDetails = utils_1.getValidatedPayload(cashInDetails, constants_1.KEYS.cashIn);
        const encodedData = js_base64_1.encode(unescape(encodeURIComponent(JSON.stringify({ "payment_code": validCashInDetails.merchant_ref_no }))));
        const dataRef = decodeURIComponent(escape(encodedData));
        const { merchant_ref_no, amount, currency, description } = validCashInDetails;
        const dataToHash = `${merchant_ref_no}${amount}${currency}${description}`;
        const secureHash = CryptoJS.HmacSHA256(dataToHash, this.secretKey).toString();
        const authHash = CryptoJS.HmacSHA256(this.apiKey, this.secretKey).toString();
        let payformData = Object.assign(Object.assign(Object.assign({}, validCashInDetails), validBillingDetails), { auth_hash: authHash, secure_hash: secureHash, alg: 'HS256' });
        const encoded = unescape(encodeURIComponent(JSON.stringify(payformData)));
        const decoded = decodeURIComponent(escape(js_base64_1.encode(encoded)));
        return axios_1.default({
            method: "post",
            url: `${constants_1.BASE_URL}/payform-link`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({ form_data: decoded })
        })
            .then((response) => response.request.responseURL)
            .catch((err) => err.data);
    }
    /**
     * Retrieves a list of usable banks.
     *
     * GET `https://devapi.traxionpay.com/banks/`
     */
    fetchBanks() {
        return axios_1.default({
            method: "get",
            url: `${constants_1.BASE_URL}/banks/`,
        })
            .then((response) => response.data)
            .catch((err) => err.data);
    }
    /**
     * Retrieves a list of usable bank accounts.
     *
     * GET `https://devapi.traxionpay.com/payout/bank-account/`
     */
    fetchBankAccounts() {
        return axios_1.default({
            method: "get",
            url: `${constants_1.BASE_URL}/payout/bank-account/`,
            headers: this.authHeaders,
        })
            .then((response) => response.data)
            .catch((err) => err.data);
    }
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
    linkBankAccount(payload) {
        if (["savings", "checkings"].includes(payload.bank_type)) {
            return axios_1.default({
                method: "post",
                url: `${constants_1.BASE_URL}/payout/bank-account/`,
                headers: this.authHeaders,
                data: utils_1.getValidatedPayload(payload, constants_1.KEYS.linkBankAccount),
            })
                .then((response) => response.data)
                .catch((err) => err.data);
        }
        throw Error("`bank_type` must either be `savings` or `checkings`.");
    }
    /**
     * Retrieves otp for `cashOut` method.
     *
     * POST `https://devapi.traxionpay.com/bank-payout/get-otp/`
     */
    fetchOTP() {
        return axios_1.default({
            method: "post",
            url: `${constants_1.BASE_URL}/payout/bank-payout/get-otp/`,
            headers: this.authHeaders,
        })
            .then((response) => response.data)
            .catch((err) => err.data);
    }
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
    cashOut(payload) {
        return axios_1.default({
            method: "post",
            url: `${constants_1.BASE_URL}/payout/bank-payout/`,
            headers: this.authHeaders,
            data: utils_1.getValidatedPayload(payload, constants_1.KEYS.cashOut),
        })
            .then((response) => response.data)
            .catch((err) => err.data);
    }
}
exports.TraxionPay = TraxionPay;
