// app/api/proxy/route.js
import { NextResponse } from "next/server";
import { avanzaUrlBuilder } from "@/src/lib/features/company/urls";
import { options, detailOptions, detailUrlBuilder } from "@/src/lib/features/company/urls";


export async function GET(req: Request) {
  const companyIdsHeader = req.headers.get("companyId");
  const timePeriod = req.headers.get("timePeriod");

  const companyIdsArray = companyIdsHeader
    ? JSON.parse(companyIdsHeader).map((item: { _id: number }) => item._id)
    : [];

  if (!companyIdsArray || !timePeriod) {
    return NextResponse.error();
  }
  const avanzaUrls = avanzaUrlBuilder({
    companyIds: companyIdsArray,
    timePeriod: JSON.parse(timePeriod),
  });
  
  const detailUrls = detailUrlBuilder(companyIdsArray[0]);
  console.log("making avanza request with urls: ", avanzaUrls);
  
  try {
    const apiResponse = await fetch(avanzaUrls[0], options);
    console.log("apiResponse: ", apiResponse);
    const data = await apiResponse.json();
    // console.log("apiResponse : ", data);
    const detailResponse = await fetch(detailUrls, detailOptions);
    const detailData = await detailResponse.json();
    // console.log("Data : ", data);

    return NextResponse.json({data, detailData});
  } catch (error) {
    console.error("Error fetching from Avanza API:", error);
    return NextResponse.error();
  }
}
