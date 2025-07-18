import type { Integer, URL } from "../../../DataType/index.ts"
import type Intangible from "../index.ts"
import type Property from "../Property/index.ts"

export default interface ConstraintNode extends Intangible {
	/** Indicates a property used as a constraint. For example, in the definition of a [[StatisticalVariable]]. The value is a property, either from within Schema.org or from other compatible (e.g. RDF) systems such as DataCommons.org or Wikidata.org. */
	constraintProperty?: Property | URL
	/** Indicates the number of constraints property values defined for a particular [[ConstraintNode]] such as [[StatisticalVariable]]. This helps applications understand if they have access to a sufficiently complete description of a [[StatisticalVariable]] or other construct that is defined using properties on template-style nodes. */
	numConstraints?: Integer
}
