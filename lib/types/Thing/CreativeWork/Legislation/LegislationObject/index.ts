import type Thing from "../../../index.ts"
import type LegalValueLevel from "../../../Intangible/Enumeration/LegalValueLevel/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { LegislationProps } from "../index.ts"

export interface LegislationObjectProps {
	/** The legal value of this legislation file. The same legislation can be written in multiple files with different legal values. Typically a digitally signed PDF have a "stronger" legal value than the HTML file of the same act. */
	legislationLegalValue?: LegalValueLevel
}

type LegislationObject =
	& Thing
	& CreativeWorkProps
	& LegislationProps
	& LegislationObjectProps

export default LegislationObject
