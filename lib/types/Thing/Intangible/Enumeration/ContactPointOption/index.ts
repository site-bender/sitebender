import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface ContactPointOptionProps {
}

type ContactPointOption =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ContactPointOptionProps

export default ContactPointOption
