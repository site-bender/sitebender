export type BooleanFieldType = "checkbox" | "radio" | "select"

export type ButtonBarPosition = "bottom" | "top"

export type ButtonType = "submit" | "reset" | "button"

export type CommunicationChannel =
	| "voice"
	| "voicemail"
	| "sms"
	| "mms"
	| "fax"
	| "video"
	| "tty"
	| "whatsapp"
	| "signal"
	| "telegram"

export type Country = {
	alpha2: string
	alpha3: string
	dialingCode: string
	name: string
	numeric: string
}

export type CountryDialingOption = {
	value: string
	label: string
}

export type DialingCodeOption = {
	value: string
	label: string
}

export type FormMethod = "GET" | "POST"

export type InputOption = {
	checked?: boolean
	id?: string
	label: string
	value: string
}

export type Option = {
	checked?: boolean
	label: string
	value: string
}

export type PhoneType = "mobile" | "landline" | "voip" | "satellite" | "pbx"

export type TrileanFieldType = "radio" | "select"

export type TrileanType = "yes" | "no" | "maybe"

export type XhrMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
