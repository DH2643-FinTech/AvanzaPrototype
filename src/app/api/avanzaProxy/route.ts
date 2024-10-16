// app/api/proxy/route.js
import { NextResponse } from "next/server";
import { avanzaUrlBuilder, avanzaUrlBuilderStockPriceTimePeriod } from "@/src/lib/features/company/urls";
import { options, detailOptions, detailUrlBuilder } from "@/src/lib/features/company/urls";


export async function GET(req: Request) {
  const companyIdsHeader = req.headers.get("companyId");
  const headerArg = companyIdsHeader ? JSON.parse(companyIdsHeader) : null;
  const {_id, name, fromDate, toDate, resolution, defaultTimePeriod} = headerArg;

  // const timePeriod = req.headers.get("timePeriod");
  // console.log("companyIdsHeader : ", companyIdsHeader);
  // const companyIdsArray = headerArg
  //   ? headerArg.map((item: { _id: number }) => item._id)
  //   : [];

  // if (!companyIdsArray || !timePeriod) {
  //   return NextResponse.error();
  // }
  // console.log("companyIdsArray : ", companyIdsArray);
  // const avanzaUrls = avanzaUrlBuilder({
  //   companyIds: companyIdsArray,
  //   timePeriod: timePeriod ? JSON.parse(timePeriod) : null,
  // });
  console.log("headerArg : ", defaultTimePeriod);
  console.log(_id, fromDate, toDate, resolution, defaultTimePeriod);
  const avanzaUrls = avanzaUrlBuilderStockPriceTimePeriod(_id, new Date(fromDate), new Date(toDate), resolution, defaultTimePeriod);
  
  const detailUrls = detailUrlBuilder(_id);

  try {
    console.log("avanzaUrls : ", avanzaUrls);
    const apiResponse = await fetch(avanzaUrls, options);
    const data = await apiResponse.json();
    // console.log("proxy apiResponse : ", data);
    const detailResponse = await fetch(detailUrls, detailOptions);
    const detailData = await detailResponse.json();
    // console.log("proxy Data : ", data);

    return NextResponse.json({data, detailData});
  } catch (error) {
    console.error("Error fetching from Avanza API:", error);
    return NextResponse.error();
  }
}
