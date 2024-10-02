import { AvanzaUrlParams, ServerCompaniesUrlParams } from "./companyTypes";


export const avanzaUrlBuilder = (params: AvanzaUrlParams): string[] => {
  const { companyIds, timePeriod = 'one_month' } = params;
  const baseUrl = 'https://www.avanza.se/_api/price-chart/stock/573878/compare';
  const urls = companyIds.map(companyId => {
    return `${baseUrl}/${companyId}?timePeriod=${encodeURIComponent(timePeriod)}`;
  });

  return urls; 
};


export const serverUrlBuilderCompanies = ({ name, randomCount }: ServerCompaniesUrlParams): string => {
  let url = "/api/companies";
  
  if (name) {
    url += `?name=${encodeURIComponent(name)}`; 
  } else if (randomCount) {
    url += `?randomCount=${randomCount}`; 
  }
  
  return url; 
};


// export const avanzaUrlBuilder = (params: UrlParams): string =>{
//   const { companyId, timePeriod = 'one_month' } = params;
//   const baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.avanza.se/_api/price-chart/stock/573878/compare';
//   const url = `${baseUrl}/${companyId}?timePeriod=${encodeURIComponent(timePeriod)}`;
//   return url;
// }

  export const url = "https://www.avanza.se/_api/price-chart/stock/573878/compare/1002994?timePeriod=one_month";
  export const options: RequestInit = {
    method: "GET",
    headers:{
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,sv;q=0.7",
      "aza-do-not-touch-session": "true",
      "content-type": "application/json;charset=UTF-8",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-securitytoken": "-",
      "cookie": "AZACOOKIECONSENT_UX=YES; AZACOOKIECONSENT_ANALYSIS=YES; AZACOOKIECONSENT_MARKETING=YES; _ga=GA1.1.1217373007.1725994723; FPID=FPID2.2.cb4nt4W%2BxpvEuOquX7navjW0uwG1EMOV0jJe1HH4tPo%3D.1725994723; FPLC=F45i8bSaeNCa97pGjRq2Eqa0VfQRda0TcKvrfOa%2FYKDo%2BkcJWBOB%2FYq0BVv5zstDkcGZB3Rsvkn4eOCPPc7QOXZImmVb5TgECGeObu28aa94BzdA%2FWijaB3%2BQCmrPA%3D%3D; AZAPERSISTENCE=0253c8bd2e-1942-40bkjA6JiOFSZZjq9nI2FARQcB4oGZ46Pr_30xYq2tkIT78Z5FQI2th1mDwb9pDCaQH1I; PAGE_ANALYTICS=2e74c1cb-e543-4992-a085-75a890895a26; _ga_W3Z698S33N=GS1.1.1727334519.3.1.1727334535.0.0.70315356",
      "Referer": "https://www.avanza.se/aktier/om-aktien.html/573878/soltech-energy-sweden",
      "Referrer-Policy": "origin-when-cross-origin"
    },
    body: null
  }