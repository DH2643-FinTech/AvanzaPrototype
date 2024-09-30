import { createAsyncThunk } from '@reduxjs/toolkit';
import { Company } from './companyTypes';

export const fetchCompanyDetails = createAsyncThunk(
  'company/fetchCompanies',
  async (arg: string, { dispatch, rejectWithValue }) => {
    try {
      const companyToSearch: string = arg;
      console.log('Company to search: ', companyToSearch);

      const response = await fetch('/api/avanzaProxy', {
        method: 'GET',
      });

      const data = await response.json();
      console.log(data);

      //TODO Change the types to reflect the actual response
      return {
        id: '1',
        name: 'Apple',
        revenue: 234,
        profit: 234,
        description: 'string',
      } as Company;
    } catch (error: any) {
      console.error('Fetch error:', error);
      return rejectWithValue(
        error.message || 'Failed to fetch company details'
      );
    }
  }
);
