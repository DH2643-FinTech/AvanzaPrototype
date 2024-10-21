import { ObjectId } from "mongodb";

export interface Company {
	_id: string;
	name: string;
	isin: string;
	lastPrice?: number;
	change?: number;
	changePercent?: number;
	description?: string;
	nextReportDate?: Date | "false";
	totalNumberOfShares?: number;
	lastAvanzaPriceUpdate?: Date;
	lastAvanzaInfoUpdate?: Date;
}

export interface AvanzaCompanyDetailsResponse {
	company: {
		ceo: string;
		chairman: string;
		companyId: string;
		description: string;
		homepage: string;
		totalNumberOfShares: number;
	};
}

export interface AvanzaCompanyPriceResponse {
	name: string;
	orderbookId: string;
	quote: {
		change: number;
		changePercent: number;
		highest: number;
		last: number;
		lowest: number;
		timeOfLast: number;
		totalVolumeTraded: number;
	};
}

export interface User {
	_id: ObjectId;
	name: string;
	email: string;
	password: string;
	provider: string;
}
