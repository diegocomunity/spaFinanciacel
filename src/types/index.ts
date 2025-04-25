// Request types
export interface CreditApplicationRequest {
  client_id: number;
  phone_id: number;
  term_months: number;
}

// Response types
export interface Application {
  id: number;
  client_id: number;
  phone_id: number;
  term_months: number;
  amount: number;
  state: string;
  created_at: string;
}

export interface Installment {
  //id: number;
  number: number;
  //credit_application_id: number;
  amount: number;
  due_date: string;
  //status: string;
}