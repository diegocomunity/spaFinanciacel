import axios from 'axios';
import { Application, Installment, CreditApplicationRequest } from '../types';

// Create a mock API for development
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to simulate API delay
const simulateApiDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data

// Mock data
const mockClients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" }
];

const mockPhones = [
  { id: 1, model: "iPhone 15", price: 999.99 },
  { id: 2, model: "Samsung Galaxy S24", price: 899.99 }
];
const mockApplications: Application[] = [
  {
    id: 1,
    client_id: 1,
    phone_id: 2,
    term_months: 12,
    amount: 1199.88,
    state: 'Approved',
    created_at: '2025-01-15T10:30:00Z'
  }
];

const mockInstallments: Record<number, Installment[]> = {
  1: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    credit_application_id: 1,
    amount: 99.99,
    due_date: new Date(new Date('2025-02-15').setMonth(new Date('2025-02-15').getMonth() + i)).toISOString(),
    status: i === 0 ? 'Paid' : i < 3 ? 'Upcoming' : 'Scheduled'
  }))
};

export const getClients = async () => {
  //await simulateApiDelay();
  const clients = await axios.get(`${API_BASE_URL}/clients`);
  console.log(`Los clientes obtenidos de la api son: ${clients.data} ============`);
  return clients.data;
};

export const getPhones = async () => {
  //await simulateApiDelay();
  //return mockPhones;

  const phones = await axios.get(`${API_BASE_URL}/phones`);
  return phones.data;
};


export const submitCreditApplication = async (data: CreditApplicationRequest): Promise<Application> => {
  try {

    console.log(data)
    // Uncomment to use real API
    const response = await axios.post(`${API_BASE_URL}/credits`, data);
    const errorMessage = await response.data["error"];

    if (errorMessage === "El cliente ya tiene un crédito activo.") {
      throw new Error(errorMessage);
    }
    console.log(await response.data["error"]);
    
    return response.data;
    
    // Mock implementation
    //await simulateApiDelay();
    /*
    const newId = mockApplications.length > 0 ? Math.max(...mockApplications.map(app => app.id)) + 1 : 1;
    
    const newApplication: Application = {
      id: newId,
      client_id: data.client_id,
      phone_id: data.phone_id,
      term_months: data.term_months,
      amount: data.term_months * 99.99, // Mock calculation
      state: 'Pending',
      created_at: new Date().toISOString()
    };
    
    mockApplications.push(newApplication);
    
    // Create mock installments for this application
    mockInstallments[newId] = Array.from({ length: data.term_months }, (_, i) => ({
      id: i + 1,
      credit_application_id: newId,
      amount: 99.99,
      due_date: new Date(new Date().setMonth(new Date().getMonth() + i + 1)).toISOString(),
      status: 'Scheduled'
    }));
    
    return newApplication;
    */
  } catch (error) {
    console.error('Error submitting credit application:', error);
    throw error;
  }
};

export const getApplicationById = async (id: number): Promise<Application> => {
  try {
    // Uncomment to use real API
    const response = await axios.get(`${API_BASE_URL}/credits/${id}`);
    console.log("testing ===")
    return response.data;
    
    // Mock implementation
    /*await simulateApiDelay();
    
    const application = mockApplications.find(app => app.id === id);
    
    if (!application) {
      throw new Error('Application not found');
    }
    
    return application;
    */
  } catch (error) {
    console.error('Error retrieving application:', error);
    throw error;
  }
};

export const getApplicationInstallments = async (id: number): Promise<Installment[]> => {
  try {
    //console.log("ver aplicaciones...")
    // Uncomment to use real API
    const response = await axios.get(`${API_BASE_URL}/credits/${id}/instalmnts`);
    
    console.log("somteht")
    console.log(await response["data"]);
    console.log("end somethin")
    return await response["data"]["instalments"];
    
    
    // Mock implementation
    /*
    await simulateApiDelay();
    
    const installments = mockInstallments[id];
    

    if (!installments) {
      throw new Error('Installments not found');
    }
    
    return installments;
    */
    
  } catch (error) {
    console.error('Error retrieving installments:', error);
    throw error;
  }
};