import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type LegalValueLevelType = "LegalValueLevel"

export interface LegalValueLevelProps {
	"@type"?: LegalValueLevelType
}

type LegalValueLevel =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& LegalValueLevelProps

export default LegalValueLevel
