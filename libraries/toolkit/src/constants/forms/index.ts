import type {
	CommunicationChannel,
	PhoneType,
} from "../../../../components/types/components/forms/index.ts"

//++ Human-readable labels for communication channels
export const CHANNEL_LABELS: Record<CommunicationChannel, string> = {
	voice: "Voice calls",
	voicemail: "Voice mail",
	sms: "SMS text messages",
	mms: "MMS messages (pictures, videos)",
	fax: "Fax",
	video: "Video calls",
	tty: "TTY/TDD (Text Telephone)",
	whatsapp: "WhatsApp",
	signal: "Signal",
	telegram: "Telegram",
}

//++ Threshold for switching from radio buttons to select dropdown
export const CHOOSE_ONE_FIELD_TOGGLE = 8

//++ Human-readable labels for phone types
export const TYPE_LABELS: Record<PhoneType, string> = {
	mobile: "Mobile phone",
	landline: "Landline",
	voip: "VoIP phone",
	satellite: "Satellite phone",
	pbx: "PBX system",
}
