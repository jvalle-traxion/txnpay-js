export interface Indexable {
  [key: string]: any;
}

export interface BillingDetails extends Indexable {
  billing_email?: string;
  billing_first_name?: string;
  billing_last_name?: string;
  billing_middle_name?: string
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

export interface LinkBankAccountFields extends Indexable{
  bank: string;
  bank_type: "savings" | "checkings",
  account_name: string;
  account_number: string;
}

export interface CashOutFields extends Indexable{
  OTP: string;
  amount: number;
  bank_account: string;
}

export interface Basis extends Indexable {
  required: boolean;
  type: string;
}

export type BillingDetailsBasis = Record<keyof BillingDetails, Basis> & Indexable;
export type CashInFieldsBasis = Record<keyof CashInFields, Basis> & Indexable;
export type LinkBankAccountFieldsBasis = Record<keyof LinkBankAccountFields, Basis> & Indexable;
export type CashOutFieldsBasis = Record<keyof CashOutFields, Basis> & Indexable;
export interface Payform extends CashInFields {
  auth_hash: string;
  secure_hash: string;
  alg: string;
}

export type BasisList = CashInFieldsBasis | BillingDetailsBasis | LinkBankAccountFieldsBasis | CashOutFieldsBasis;
export type Payload = CashInFields | BillingDetails | CashOutFields | LinkBankAccountFields;