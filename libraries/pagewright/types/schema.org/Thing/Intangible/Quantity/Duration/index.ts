import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { QuantityProps } from "../index.ts"

export type DurationType = "Duration"

export interface DurationProps {
	"@type"?: DurationType
}

type Duration = Thing & IntangibleProps & QuantityProps & DurationProps

export default Duration
