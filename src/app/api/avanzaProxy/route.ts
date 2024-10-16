// app/api/proxy/route.js
import { NextResponse } from "next/server";
import { avanzaUrlBuilder, avanzaUrlBuilderStockPriceTimePeriod } from "@/src/lib/features/company/urls";
import { options, detailOptions, detailUrlBuilder } from "@/src/lib/features/company/urls";


export async function GET(req: Request) {
  const companyIdsHeader = req.headers.get("companyInfo");
  const headerArg = companyIdsHeader ? JSON.parse(companyIdsHeader) : null;
  const {_id, name, fromDate, toDate, resolution, defaultTimePeriod} = headerArg;

  const avanzaUrls = avanzaUrlBuilderStockPriceTimePeriod(_id, new Date(fromDate), new Date(toDate), resolution, defaultTimePeriod);
  
  const detailUrls = detailUrlBuilder(_id);

  try {
    const apiResponse = await fetch(avanzaUrls, options);
    const data = await apiResponse.json();
    const detailResponse = await fetch(detailUrls, detailOptions);
    const detailData = await detailResponse.json();
    return NextResponse.json({data, detailData});
  } catch (error) {
    console.error("Error fetching from Avanza API:", error);
    return NextResponse.error();
  }
}
