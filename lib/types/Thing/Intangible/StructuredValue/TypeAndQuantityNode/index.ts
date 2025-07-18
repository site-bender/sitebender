import type { Number, Text, URL } from "../../../../DataType/index.ts"
import type Product from "../../../Product/index.ts"
import type BusinessFunction from "../../Enumeration/BusinessFunction/index.ts"
import type Service from "../../Service/index.ts"
import type StructuredValue from "../index.ts"

export default interface TypeAndQuantityNode extends StructuredValue {
	/** The quantity of the goods included in the offer. */
	amountOfThisGood?: Number
	/** The business function (e.g. sell, lease, repair, dispose) of the offer or component of a bundle (TypeAndQuantityNode). The default is http://purl.org/goodrelations/v1#Sell. */
	businessFunction?: BusinessFunction
	/** The product that this structured value is referring to. */
	typeOfGood?: Product | Service
	/** The unit of measurement given using the UN/CEFACT Common Code (3 characters) or a URL. Other codes than the UN/CEFACT Common Code may be used with a prefix followed by a colon. */
	unitCode?: Text | URL
	/** A string or text indicating the unit of measurement. Useful if you cannot provide a standard unit code for <a href='unitCode'>unitCode</a>. */
	unitText?: Text
}
