// app/api/proxy/route.js
import { NextResponse } from "next/server";
import {
  options,
  detailOptions,
  detailUrlBuilder,
  avanzaUrlBuilderStockPriceTimePeriod,
} from "@/lib/utils/urls";

export async function GET(req: Request) {
  const companyIdsHeader = req.headers.get("companyInfo");
  const headerArg = companyIdsHeader ? JSON.parse(companyIdsHeader) : null;
  const {
    _id,
    name,
    fromDate,
    toDate,
    resolution,
    defaultTimePeriod,
    fromDateValid,
  } = headerArg;

  const avanzaUrls = avanzaUrlBuilderStockPriceTimePeriod({
    companyId: _id,
    fromDate: new Date(fromDate),
    toDate: new Date(toDate),
    resolution: resolution,
    defaultTimePeriod: defaultTimePeriod,
    fromDateValid: fromDateValid,
  });


  const detailUrls = detailUrlBuilder(_id);


  try {
    const apiResponse = await fetch(avanzaUrls, options);
    const data = await apiResponse.json();
    const detailResponse = await fetch(detailUrls, detailOptions);
    const detailData = await detailResponse.json();
    return NextResponse.json({ data, detailData });
  } catch (error) {
    console.error("Error fetching from Avanza API:", error);
    return NextResponse.error();
  }
}
