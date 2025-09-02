import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type ContactPointOptionType = "ContactPointOption"

export interface ContactPointOptionProps {
	"@type"?: ContactPointOptionType
}

type ContactPointOption =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ContactPointOptionProps

export default ContactPointOption
