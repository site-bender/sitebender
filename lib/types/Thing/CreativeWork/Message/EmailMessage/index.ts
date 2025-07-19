// EmailMessage extends Message but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MessageProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface EmailMessageProps {}

type EmailMessage =
	& Thing
	& CreativeWorkProps
	& MessageProps
	& EmailMessageProps

export default EmailMessage
