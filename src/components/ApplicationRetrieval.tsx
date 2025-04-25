import React, { useState } from 'react';
import { getApplicationById, getApplicationInstallments } from '../services/api';
import { ApplicationDetails } from './ApplicationDetails';
import { InstallmentsList } from './InstallmentsList';
import { AlertMessage } from './ui/AlertMessage';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Search } from 'lucide-react';
import { Application, Installment } from '../types';

export const ApplicationRetrieval: React.FC = () => {
  const [applicationId, setApplicationId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [alert, setAlert] = useState<{type: 'success' | 'error' | null, message: string}>({
    type: null,
    message: ''
  });

  const handleRetrieve = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationId) {
      setAlert({
        type: 'error',
        message: 'Please enter an application ID'
      });
      return;
    }

    setIsLoading(true);
    setAlert({ type: null, message: '' });
    setApplication(null);
    setInstallments([]);

    try {
      // Fetch application data
      const appData = await getApplicationById(parseInt(applicationId));
      setApplication(appData);
      
      // Fetch installments data
      const installmentsData = await getApplicationInstallments(parseInt(applicationId));
      setInstallments(installmentsData);
      
      setAlert({
        type: 'success',
        message: 'Application data retrieved successfully'
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to retrieve application data. Please check the ID and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="p-6">
          {alert.type && (
            <div className="mb-6">
              <AlertMessage type={alert.type} message={alert.message} />
            </div>
          )}
          
          <form onSubmit={handleRetrieve} className="space-y-6">
            <Input
              id="applicationId"
              label="Application ID"
              type="number"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              placeholder="Enter application ID"
              required
              min="1"
            />
            
            <Button
              type="submit"
              isLoading={isLoading}
              fullWidth
              icon={isLoading ? undefined : <Search className="w-4 h-4" />}
            >
              {isLoading ? 'Retrieving...' : 'Retrieve Application'}
            </Button>
          </form>
        </div>
      </div>
      
      {application && (
        <div className="space-y-6 animate-fadeIn">
          <ApplicationDetails application={application} />
          
          {installments.length > 0 && (
            <InstallmentsList installments={installments} />
          )}
        </div>
      )}
    </div>
  );
};