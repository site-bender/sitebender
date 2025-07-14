import { CssSelectorType, XPathType } from "../../../DataType/index.ts"
import Intangible from "../index.ts"

export default interface SpeakableSpecification extends Intangible {
	/** A CSS selector, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
	cssSelector?: CssSelectorType
	/** An XPath, e.g. of a [[SpeakableSpecification]] or [[WebPageElement]]. In the latter case, multiple matches within a page can constitute a single conceptual "Web page element". */
	xpath?: XPathType
}
