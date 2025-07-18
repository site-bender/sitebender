import type LegalValueLevel from "../../../Intangible/Enumeration/LegalValueLevel/index.ts"
import type Legislation from "../index.ts"

export default interface LegislationObject extends Legislation {
	/** The legal value of this legislation file. The same legislation can be written in multiple files with different legal values. Typically a digitally signed PDF have a "stronger" legal value than the HTML file of the same act. */
	legislationLegalValue?: LegalValueLevel
}
