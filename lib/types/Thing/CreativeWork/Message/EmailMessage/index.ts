import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MessageProps } from "../index.ts"

export interface EmailMessageProps {
}

type EmailMessage =
	& Thing
	& CreativeWorkProps
	& MessageProps
	& EmailMessageProps

export default EmailMessage
