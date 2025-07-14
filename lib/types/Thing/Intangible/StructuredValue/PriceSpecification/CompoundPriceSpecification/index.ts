import { Text } from "../../../../../DataType/index.ts"
import PriceTypeEnumeration from "../../../Enumeration/PriceTypeEnumeration/index.ts"
import PriceSpecification from "../index.ts"
import UnitPriceSpecification from "../UnitPriceSpecification/index.ts"

export default interface CompoundPriceSpecification extends PriceSpecification {
	/** This property links to all [[UnitPriceSpecification]] nodes that apply in parallel for the [[CompoundPriceSpecification]] node. */
	priceComponent?: UnitPriceSpecification
	/** Defines the type of a price specified for an offered product, for example a list price, a (temporary) sale price or a manufacturer suggested retail price. If multiple prices are specified for an offer the [[priceType]] property can be used to identify the type of each such specified price. The value of priceType can be specified as a value from enumeration PriceTypeEnumeration or as a free form text string for price types that are not already predefined in PriceTypeEnumeration. */
	priceType?: PriceTypeEnumeration | Text
}
