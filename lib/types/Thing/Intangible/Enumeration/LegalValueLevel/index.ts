import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface LegalValueLevelProps {
	"@type"?: "LegalValueLevel"}

type LegalValueLevel =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& LegalValueLevelProps

export default LegalValueLevel
