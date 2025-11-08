import type { Maybe } from "@sitebender/toolsmith/types/fp/maybe/index.ts"

//++ CountryCode: E.164 country calling code with + prefix
//++ Examples: "+1" (US/Canada), "+44" (UK), "+81" (Japan)
export type CountryCode = string & { readonly __brand: "CountryCode" }

//++ NationalNumber: National significant number without country code
//++ Format varies by country, typically 4-15 digits
//++ Examples: "5551234567", "2079460000"
export type NationalNumber = string & { readonly __brand: "NationalNumber" }

//++ Extension: Optional extension number
//++ Typically 1-6 digits for PBX extensions
//++ Examples: "123", "4567"
export type Extension = string & { readonly __brand: "Extension" }

//++ PhoneType: Type of phone line/device
//++ Mobile: Cellular/mobile phone
//++ Landline: Fixed-line telephone
//++ Satellite: Satellite phone
//++ VoIP: Voice over IP phone
export type PhoneType =
	| { readonly _tag: "Mobile" }
	| { readonly _tag: "Landline" }
	| { readonly _tag: "Satellite" }
	| { readonly _tag: "VoIP" }

//++ PhoneUse: Intended use/capability of phone number
//++ Voice: Voice calls supported
//++ SMS: Text messaging supported
//++ Fax: Fax transmission supported
//++ Data: Data transmission supported
export type PhoneUse =
	| { readonly _tag: "Voice" }
	| { readonly _tag: "SMS" }
	| { readonly _tag: "Fax" }
	| { readonly _tag: "Data" }

//++ PhoneNumber: Complete phone number with E.164 format and metadata
//++ Validated against E.164 international phone number standard
//++ Includes type and use metadata for richer semantic information
export type PhoneNumber = {
	readonly countryCode: CountryCode
	readonly nationalNumber: NationalNumber
	readonly extension: Maybe<Extension>
	readonly phoneType: PhoneType
	readonly phoneUse: PhoneUse
} & { readonly __brand: "PhoneNumber" }

//++ PhoneNumberData: Input data for constructing PhoneNumber
//++ Plain object with string values for smart constructor
//++ extension is optional (undefined if not provided)
export type PhoneNumberData = {
	readonly countryCode: string
	readonly nationalNumber: string
	readonly extension?: string
	readonly phoneType: "Mobile" | "Landline" | "Satellite" | "VoIP"
	readonly phoneUse: "Voice" | "SMS" | "Fax" | "Data"
}
