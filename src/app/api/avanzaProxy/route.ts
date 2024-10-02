// app/api/proxy/route.js
import { NextResponse } from "next/server";
import { avanzaUrlBuilder } from "@/src/lib/features/company/urls";
import { options } from "@/src/lib/features/company/urls";
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

  try {
    const apiResponse = await fetch(avanzaUrls[0], options);

    const data = await apiResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from Avanza API:", error);
    return NextResponse.error();
  }
}
