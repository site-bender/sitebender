import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

import EventStatusTypeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.tsx"

export interface EventStatusTypeProps {
}

type EventStatusType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& EventStatusTypeProps

export default EventStatusType
