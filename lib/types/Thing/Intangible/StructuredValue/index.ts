import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface StructuredValueProps {
	"@type"?: "StructuredValue"}

type StructuredValue = Thing & IntangibleProps & StructuredValueProps

export default StructuredValue
