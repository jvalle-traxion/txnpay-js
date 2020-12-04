var CryptoJS = require("crypto-js");
var qs = require("querystring");
import axios from "axios";
import { encode } from "js-base64";

import { BASE_URL, KEYS } from "./constants";
import { BillingDetails, CashInFields, CashOutFields, LinkBankAccountFields, Payform } from "./types";
import { generateToken, getValidatedPayload } from "./utils";

export class TraxionPay {
  public apiKey: string;
  public secretKey: string;
  public token: string;
  public authHeaders: {};

  constructor(apiKey: string, secretKey: string) {
    if (apiKey && secretKey) {
      this.apiKey = apiKey;
      this.secretKey = secretKey;
      this.token = generateToken(secretKey);
      this.authHeaders = {
        Authorization: `Basic ${this.token}`,
        "Content-Type": "application/json",
      };
    } else {
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
  cashIn(payload: CashInFields) {
    const billing_details = payload.billing_details ?? {};
    delete payload.billing_details;
    const cashInDetails = payload;

    let validBillingDetails = getValidatedPayload(billing_details, KEYS.billingDetails);
    let validCashInDetails = getValidatedPayload(cashInDetails, KEYS.cashIn);
    
    const encodedData = encode(unescape(encodeURIComponent(JSON.stringify({ "payment_code": validCashInDetails.merchant_ref_no }))));
    const dataRef = decodeURIComponent(escape(encodedData));

    const { merchant_ref_no, amount, currency, description } = validCashInDetails;
    const dataToHash = `${merchant_ref_no}${amount}${currency}${description}`;
    const secureHash = CryptoJS.HmacSHA256(dataToHash, this.secretKey).toString();
    const authHash = CryptoJS.HmacSHA256(this.apiKey, this.secretKey).toString();

    let payformData: Payform = {
      ...<CashInFields>validCashInDetails,
      ...<BillingDetails>validBillingDetails,
      auth_hash: authHash,
      secure_hash: secureHash,
      alg: 'HS256'
    };
    
    const encoded = unescape(encodeURIComponent(JSON.stringify(payformData)));
    const decoded = decodeURIComponent(escape(encode(encoded)));
    
    return axios({
      method: "post",
      url: `${BASE_URL}/payform-link`,
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
    return axios({
      method: "get",
      url: `${BASE_URL}/banks/`,
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
    return axios({
      method: "get",
      url: `${BASE_URL}/payout/bank-account/`,
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
  linkBankAccount(payload: LinkBankAccountFields) {
    if (["savings", "checkings"].includes(payload.bank_type)) {
      return axios({
        method: "post",
        url: `${BASE_URL}/payout/bank-account/`,
        headers: this.authHeaders,
        data: getValidatedPayload(payload, KEYS.linkBankAccount),
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
    return axios({
      method: "post",
      url: `${BASE_URL}/payout/bank-payout/get-otp/`,
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
  cashOut(payload: CashOutFields) {
    return axios({
      method: "post",
      url: `${BASE_URL}/payout/bank-payout/`,
      headers: this.authHeaders,
      data: getValidatedPayload(payload, KEYS.cashOut),
    })
      .then((response) => response.data)
      .catch((err) => err.data);
  }
}
