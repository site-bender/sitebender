// ContactPointOption extends Enumeration but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ContactPointOptionProps {}

type ContactPointOption =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& ContactPointOptionProps

export default ContactPointOption
