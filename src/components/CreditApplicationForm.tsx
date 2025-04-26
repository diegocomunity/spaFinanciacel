
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { submitCreditApplication, getClients, getPhones } from '../services/api';
import { AlertMessage } from './ui/AlertMessage';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { CreditCard, Check, AlertCircle } from 'lucide-react';

export const CreditApplicationForm: React.FC = () => {
  const [clientId, setClientId] = useState<string>('1');
  const [phoneId, setPhoneId] = useState<string>('2');
  const [termMonths, setTermMonths] = useState<string>('12');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alert, setAlert] = useState<{type: 'success' | 'error' | null, message: string}>({
    type: null,
    message: ''
  });

  //agregar los query de clients y phones
  
  const { data: clients, isLoading: isLoadingClients } = useQuery('clients', getClients);
  const { data: phones, isLoading: isLoadingPhones } = useQuery('phones', getPhones);


  const termOptions = Array.from({ length: 36 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} month${i === 0 ? '' : 's'}`
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientId || !phoneId || !termMonths) {
      setAlert({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setAlert({ type: null, message: '' });
      
      const response = await submitCreditApplication({
        client_id: parseInt(clientId),
        phone_id: parseInt(phoneId),
        term_months: parseInt(termMonths)
      });
      
      setAlert({
        type: 'success',
        message: `Se ha hecho la aplicaciòn al crédito éxitosamente`
      });
      
      // Reset form after successful submission
      // setClientId('');
      // setPhoneId('');
      // setTermMonths('12');
    } catch (error) {
      let hasError = error as Error
      setAlert({
        type: 'error',
        message: hasError.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        {alert.type && (
          <div className="mb-6">
            <AlertMessage type={alert.type} message={alert.message} />
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/**start select de usuario */}
            <Select
              id="clientId"
              label="Client"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              options={clients?.map(client => ({
                value: String(client.id),
                label: client.name
              })) || []}
              placeholder="Seleccione el cliente"
              required
              disabled={isLoadingClients}
            />
            {/**end select de usuario */}

            {
              /**
               * start select de phone
               */
            }
            <Select
              id="phoneId"
              label="Phone Model"
              value={phoneId}
              onChange={(e) => setPhoneId(e.target.value)}
              options={phones?.map(phone => ({
                value: String(phone.id),
                label: `${phone.model} - ${new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'COP'
                }).format(phone.price)}`
              })) || []}
              placeholder="Seleccione el modelo"
              required
              disabled={isLoadingPhones}
            />
            {
              /**
               * end select del phone
               */
            }
            {
              /**
               *             <Input
              id="clientId"
              label="Client ID"
              type="number"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter client ID"
              required
              min="1"
              icon={<CreditCard className="w-5 h-5 text-gray-400" />}
            />
               * 
               */
            }

            
            {
              /**
               *             <Input
              id="phoneId"
              label="Phone ID"
              type="number"
              value={phoneId}
              onChange={(e) => setPhoneId(e.target.value)}
              placeholder="Enter phone ID"
              required
              min="1"
            />
               */
            }
            
            <Select
              id="termMonths"
              label="Term in Months"
              value={termMonths}
              onChange={(e) => setTermMonths(e.target.value)}
              options={termOptions}
              required
            />
          </div>
          
          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isSubmitting}
              fullWidth
              icon={isSubmitting ? undefined : <Check className="w-4 h-4" />}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};