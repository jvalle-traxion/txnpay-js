const { TraxionPay, createAdditionalData } = require('../lib');

const apiKey = "7)5dmcfy^dp*9bdrcfcm$k-n=p7b!x(t)_f^i8mxl@v_+rno*x";
const secretKey = "cxl+hwc%97h6+4#lx1au*ut=ml+=!fx85w94iuf*06=rf383xs";
const traxionpay = new TraxionPay(apiKey, secretKey);

describe("Traxionpay object", () => {
  it("should instantiate", () => {
    const api = new TraxionPay(apiKey, secretKey);
    expect(api).toBeInstanceOf(TraxionPay);
  });

  it("should throw error when secretKey is missing", () => {
    expect(() => {
      const api = new TraxionPay(apiKey);
    }).toThrowError();
  });

  it("should throw error when apiKey is missing", () => {
    expect(() => {
      const api = new TraxionPay(secretKey);
    }).toThrowError();
  });
});

describe("Cash in", () => {

  const devUrl = "https://dev.traxionpay.com/";
  const apiurl = "https://devapi.traxionpay.com/callback"
  
  let samplePayload = {
    merchant_id: 6328,
    merchant_ref_no: "ABC123DEF456",
    merchant_additional_data: createAdditionalData({ "payment_code": "some_code" }),
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
  };

  it("should return responseURL when successfull", async () => {
    const response = await traxionpay.cashIn(samplePayload);
    expect(response).toBeDefined();
  });

  it("should throw error when additional_data is invalid", () => {
    let newPayload = {...samplePayload};
    newPayload.merchant_additional_data = "test invalidity";
    expect(async () => await traxionpay.cashIn(newPayload)).rejects.toThrowError();
  });

  it("should throw error when some properties are missing", () => {
    let newPayload = {...samplePayload};
    delete newPayload['amount'];
    expect(async () => await traxionpay.cashIn(newPayload)).rejects.toThrowError();
  });

  it("show throw error when some property type is invalid", () => {
    let newPayload = {...samplePayload};
    newPayload.merchant_id = newPayload.merchant_id.toString();
    expect(async () => await traxionpay.cashIn(newPayload)).rejects.toThrowError();
  });
});

// describe("Fetch banks", () => {
//   it("should return banks", async () => {
//     const banks = await traxionpay.fetchBanks();
//     expect(banks.length).toBeGreaterThan(0);
//   });
// }, 6000);

// describe("Fetch bank accounts", () => {
//   it("should return bank accounts", async () => {
//     const bankAccounts = await traxionpay.fetchBankAccounts();
//     expect(bankAccounts.length).toBeGreaterThan(0);
//   });
// }, 6000);

// describe("Fetch otp", () => {
//   it("should return an otp with code", async () => {
//     const otp = await traxionpay.fetchOTP();
//     expect(otp).toHaveProperty("code");
//   }, 6000);
// });

// describe("Link bank account", () => {
//   it("should return object when successful", async () => {
//     const response = await traxionpay.linkBankAccount({
//       bank: '6311',
//       bank_type: 'savings',
//       account_name: 'John Doe',
//       account_number: '123456789'
//     });

//     expect(response).toHaveProperty('id');
//     expect(response).toHaveProperty('bank_name');
//     expect(response).toHaveProperty('account_number');
//   });

//   it("should throw error if payload type is not an object", () => {
//     expect(async () => await traxionpay.linkBankAccount('test')).rejects.toThrowError();
//   });

//   it("should throw error if property type is invalid", () => {
//     expect(async () => await traxionpay.linkBankAccount({
//       bank: 6311
//     })).rejects.toThrowError();
//   });

//   it("should throw error if bank_type is invalid", () => {
//     expect(async () => await traxionpay.linkBankAccount({
//       bank: '6311',
//       bank_type: 'test',
//       account_name: 'John Doe',
//       account_number: '1234'
//     })).rejects.toThrowError();
//   });

//   it("should throw error if some properties are missing", () => {
//     expect(async () => await traxionpay.linkBankAccount({
//       bank: '6311',
//       account_name: 'John Doe',
//       account_number: '123456789'
//     })).rejects.toThrowError();
//   });
// });

// describe("Cash out", () => {
//   it("should return an object if successful", async () => {
//     const { code } = await traxionpay.fetchOTP();
//     const response = await traxionpay.cashOut({
//       OTP: code,
//       amount: 100,
//       bank_account: 433
//     });
//     expect(response).toHaveProperty('ref_no');
//     expect(response).toHaveProperty('remittance_id');
//     expect(response).toHaveProperty('transaction_id');
//   });

//   it("should throw error if property type is invalid", () => {
//     expect(async () => await traxionpay.cashOut({
//       OTP: '1234',
//       amount: 1234,
//       bank_account: '1234'
//     })).rejects.toThrowError();
//   });

//   it("should throw error if OTP is invalid", () => {
//     expect(async () => await traxionpay.cashOut({
//       OTP: '1234',
//       amount: 100,
//       bank_account: 433
//     })).rejects.toThrowError();
//   });
// });
