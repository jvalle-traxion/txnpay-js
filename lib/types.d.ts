export interface Indexable {
    [key: string]: any;
}
export interface BillingDetails extends Indexable {
    billing_email?: string;
    billing_first_name?: string;
    billing_last_name?: string;
    billing_middle_name?: string;
    billing_phone?: string;
    billing_mobile?: string;
    billing_address?: string;
    billing_address2?: string;
    billing_city?: string;
    billing_state?: string;
    billing_zip?: string;
    billing_country?: string;
    billing_remark?: string;
}
export interface CashInFields extends Indexable {
    merchant_id: number;
    merchant_ref_no: string;
    description: string;
    amount: number;
    currency: string;
    merchant_additional_data: string;
    payment_method?: string;
    status_notification_url: string;
    success_page_url: string;
    failure_page_url: string;
    cancel_page_url: string;
    pending_page_url: string;
    billing_details?: BillingDetails;
}
export interface LinkBankAccountFields extends Indexable {
    bank: string;
    bank_type: "savings" | "checkings";
    account_name: string;
    account_number: string;
}
export interface CashOutFields extends Indexable {
    OTP: string;
    amount: number;
    bank_account: string;
}
export interface Basis extends Indexable {
    required: boolean;
    type: string;
}
export interface BillingDetailsBasis extends Indexable {
    billing_email: Basis;
    billing_first_name: Basis;
    billing_last_name: Basis;
    billing_middle_name: Basis;
    billing_phone: Basis;
    billing_mobile: Basis;
    billing_address: Basis;
    billing_address2: Basis;
    billing_city: Basis;
    billing_state: Basis;
    billing_zip: Basis;
    billing_country: Basis;
    billing_remark: Basis;
}
export interface CashInFieldsBasis extends Indexable {
    merchant_id: Basis;
    merchant_ref_no: Basis;
    description: Basis;
    amount: Basis;
    currency: Basis;
    merchant_additional_data: Basis;
    payment_method?: Basis;
    status_notification_url: Basis;
    success_page_url: Basis;
    failure_page_url: Basis;
    cancel_page_url: Basis;
    pending_page_url: Basis;
}
export interface Payform extends CashInFields {
    auth_hash: string;
    secure_hash: string;
    alg: string;
}
export interface LinkBankAccountFieldsBasis extends Indexable {
    bank: Basis;
    bank_type: Basis;
    account_name: Basis;
    account_number: Basis;
}
export interface CashOutFieldsBasis extends Indexable {
    OTP: Basis;
    amount: Basis;
    bank_account: Basis;
}
export declare type BasisList = CashInFieldsBasis | BillingDetailsBasis | LinkBankAccountFieldsBasis | CashOutFieldsBasis;
export declare type Payload = CashInFields | BillingDetails | CashOutFields | LinkBankAccountFields;
