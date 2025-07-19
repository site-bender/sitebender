import type { CssSelectorType, XPathType } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface SpeakableSpecificationProps {
	/** A CSS selector, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
	cssSelector?: CssSelectorType
	/** An XPath, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
	xpath?: XPathType
}

type SpeakableSpecification =
	& Thing
	& IntangibleProps
	& SpeakableSpecificationProps

export default SpeakableSpecification
