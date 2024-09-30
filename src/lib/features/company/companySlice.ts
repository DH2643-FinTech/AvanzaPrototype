import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Company, CompanyState } from './companyTypes';
import { fetchCompanyDetails } from './companyAPI';
import { RootState } from '@/src/lib/store/store';

const initialState: CompanyState = {
    companies: [],
    companyDetails: null,
    loading: false,
    error: '',
};

const companySlice = createSlice(
    {
        name: 'company',
        initialState,
        reducers: {
            setCurrentCompany: (state, action: PayloadAction<string>) => {
                state.companyDetails = state.companies.find(company => company.id === action.payload) || null;
            },
        },
        extraReducers: (builder) => {
            builder.addCase(fetchCompanyDetails.pending, (state) => {
                state.loading = true;
            });
            builder.addCase(fetchCompanyDetails.fulfilled, (state, action: PayloadAction<Company | string>) => {
                state.loading = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.companyDetails = action.payload;
                }
            });
            builder.addCase(fetchCompanyDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        }
    }
);

export const {setCurrentCompany} = companySlice.actions;
export const selectCurrentCompany = (state: RootState) => state.company.companyDetails;
export default companySlice.reducer;
