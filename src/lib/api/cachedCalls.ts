import { Company } from "@/interfaces";
import { Collection } from "mongodb";
import { avanzaFetchGeneralInfo, avanzaFetchPrice } from "./avanzaCalls";

export const getCachedCompany = async (companyId: string, collection: Collection<Company>) => {
  let updatedCompany = null;
  console.log('Fetching company', companyId);
  
  const company = await collection.findOne({ _id: companyId });
  if(!company) {
    throw new Error('Company not found');
  }

  //This is mostly static data and will only be fetched once every 7 days  
  if(!company.lastAvanzaInfoUpdate || company.lastAvanzaInfoUpdate.getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000) {
    const newData = await avanzaFetchGeneralInfo(companyId);
    await collection.updateOne({ _id: companyId }, { $set: { description: newData.company.description, totalNumberOfShares: newData.company.totalNumberOfShares } });
    updatedCompany = await collection.findOne({ _id: companyId });
  }

  //This is more dynamic data and will be fetched every 4 hours
  if(!company.lastAvanzaPriceUpdate || company.lastAvanzaPriceUpdate.getTime() < Date.now() - 4 * 60 * 60 * 1000) {
    const newData = await avanzaFetchPrice(companyId);
    await collection.updateOne({ _id: companyId }, { $set: { lastPrice: newData.quote.last, change: newData.quote.change, changePercent: newData.quote.changePercent } });
    updatedCompany = await collection.findOne({ _id: companyId });
  }

  return updatedCompany || company;
}