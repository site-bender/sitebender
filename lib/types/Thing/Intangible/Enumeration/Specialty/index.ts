import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface SpecialtyProps {
	"@type"?: "Specialty"}

type Specialty = Thing & IntangibleProps & EnumerationProps & SpecialtyProps

export default Specialty
