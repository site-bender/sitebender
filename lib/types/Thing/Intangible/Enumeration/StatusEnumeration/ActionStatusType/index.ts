import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export interface ActionStatusTypeProps {}

type ActionStatusType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& ActionStatusTypeProps

export default ActionStatusType
