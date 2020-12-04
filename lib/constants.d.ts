export declare const BASE_URL = "https://devapi.traxionpay.com";
export declare const KEYS: {
    cashIn: {
        merchant_id: {
            required: boolean;
            type: string;
        };
        merchant_ref_no: {
            required: boolean;
            type: string;
        };
        description: {
            required: boolean;
            type: string;
        };
        amount: {
            required: boolean;
            type: string;
        };
        currency: {
            required: boolean;
            type: string;
            default: string;
        };
        merchant_additional_data: {
            required: boolean;
            type: string;
        };
        payment_method: {
            required: boolean;
            type: string;
        };
        status_notification_url: {
            required: boolean;
            type: string;
        };
        success_page_url: {
            required: boolean;
            type: string;
        };
        failure_page_url: {
            required: boolean;
            type: string;
        };
        cancel_page_url: {
            required: boolean;
            type: string;
        };
        pending_page_url: {
            required: boolean;
            type: string;
        };
    };
    billingDetails: {
        billing_email: {
            required: boolean;
            type: string;
        };
        billing_first_name: {
            required: boolean;
            type: string;
        };
        billing_last_name: {
            required: boolean;
            type: string;
        };
        billing_middle_name: {
            required: boolean;
            type: string;
        };
        billing_phone: {
            required: boolean;
            type: string;
        };
        billing_mobile: {
            required: boolean;
            type: string;
        };
        billing_address: {
            required: boolean;
            type: string;
        };
        billing_address2: {
            required: boolean;
            type: string;
        };
        billing_city: {
            required: boolean;
            type: string;
        };
        billing_state: {
            required: boolean;
            type: string;
        };
        billing_zip: {
            required: boolean;
            type: string;
        };
        billing_country: {
            required: boolean;
            type: string;
            default: string;
        };
        billing_remark: {
            required: boolean;
            type: string;
        };
    };
    linkBankAccount: {
        bank: {
            required: boolean;
            type: string;
        };
        bank_type: {
            required: boolean;
            type: string;
        };
        account_name: {
            required: boolean;
            type: string;
        };
        account_number: {
            required: boolean;
            type: string;
        };
    };
    cashOut: {
        OTP: {
            required: boolean;
            type: string;
        };
        amount: {
            required: boolean;
            type: string;
        };
        bank_account: {
            required: boolean;
            type: string;
        };
    };
};
