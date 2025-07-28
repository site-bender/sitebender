import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import DayOfWeekComponent from "../../../../../../components/Thing/Intangible/Enumeration/DayOfWeek/index.tsx"

export interface DayOfWeekProps {
}

type DayOfWeek =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& DayOfWeekProps

export default DayOfWeek
