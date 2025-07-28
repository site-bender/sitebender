import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import ContactPointOptionComponent from "../../../../../../components/Thing/Intangible/Enumeration/ContactPointOption/index.tsx"

export interface ContactPointOptionProps {
}

type ContactPointOption =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ContactPointOptionProps

export default ContactPointOption
