import { AvanzaCompanyDetailsResponse, AvanzaCompanyPriceResponse } from "@/../interfaces";

const avanzaBaseUrl = 'https://www.avanza.se/_api';

export const avanzaFetchGeneralInfo = async (companyId: string) => {
  const response = await fetch(`${avanzaBaseUrl}/market-guide/stock/${companyId}/details`);
  if (!response.ok) {
    
    throw new Error('Failed to fetch general info');
  }
  return await response.json() as AvanzaCompanyDetailsResponse;
}

export const avanzaFetchPrice = async (companyId: string) =>{
  const response = await fetch(`${avanzaBaseUrl}/market-guide/stock/${companyId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch price info');
  }
  return await response.json() as AvanzaCompanyPriceResponse;
}
