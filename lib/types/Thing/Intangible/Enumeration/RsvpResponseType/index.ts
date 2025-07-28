import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import RsvpResponseTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/RsvpResponseType/index.tsx"

export interface RsvpResponseTypeProps {
}

type RsvpResponseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RsvpResponseTypeProps

export default RsvpResponseType
