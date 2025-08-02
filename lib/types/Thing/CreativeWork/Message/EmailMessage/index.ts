import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MessageProps } from "../index.ts"

export type EmailMessageType = "EmailMessage"

export interface EmailMessageProps {
	"@type"?: EmailMessageType
}

type EmailMessage = Thing & CreativeWorkProps & MessageProps & EmailMessageProps

export default EmailMessage
