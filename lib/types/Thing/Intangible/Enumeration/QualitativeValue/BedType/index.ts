import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { QualitativeValueProps } from "../index.ts"

export interface BedTypeProps {
	"@type"?: "BedType"}

type BedType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& QualitativeValueProps
	& BedTypeProps

export default BedType
