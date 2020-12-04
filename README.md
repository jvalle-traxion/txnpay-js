# TraxionPay JavaScript SDK

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation
```sh
npm install txnpay
```

## Usage

#### Initialize
After installing, initialize by importing the package and using the [public and secret keys](https://dev.traxionpay.com/developers-guide).
```javascript
// ES5
const { TraxionPay } = require('txnpay');
// ES6
import { TraxionPay } from 'txnpay';

const traxionpay = new TraxionPay(apiKey, secretKey);
```
#### Cash in
```javascript
# Sample arguments are the bare minimum for cash_in
const response = await traxionpay.cashIn({
  merchant_id: 6328,
  merchant_ref_no: "ABC123DEF456",
  merchant_additional_data: "eyJwYXltZW50X2NvZGUiOiAiQUJDMTIzREVGNDU2In0=",
  description: "My test payment",
  amount: 1500.0,
  status_notification_url: apiurl,
  success_page_url: devUrl,
  failure_page_url: devUrl,
  cancel_page_url: devUrl,
  pending_page_url: devUrl,
  billing_details: {
    billing_email: 'johndoe@gmail.com'
  }
});
```
#### Cash out
```javascript
const { code } = await traxionpay.fetchOTP();
const response = await traxionpay.cashOut({
  OTP: code,
  amount: 100,
  bank_account: 433
});
```
#### Link a bank account
```javascript
const response = await traxionpay.linkBankAccount({
  bank: '6311',
  bank_type: 'savings',
  account_name: 'John Doe',
  account_number: '123456789'
});
```
#### Fetch Cash Out OTP
```javascript
const { code } = await traxionpay.fetchOTP();
```
#### Fetch bank accounts
```javascript
const bankAccounts = await traxionpay.fetchBankAccounts();
```
#### Fetch banks
```javascript
const banks = await traxionpay.fetchBanks();
```
