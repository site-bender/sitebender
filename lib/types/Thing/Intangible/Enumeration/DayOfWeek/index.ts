import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface DayOfWeekProps {}

type DayOfWeek = Thing & IntangibleProps & EnumerationProps & DayOfWeekProps

export default DayOfWeek
