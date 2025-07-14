import { Text, URL } from "../../../../DataType/index.ts"
import Thing from "../../../../index.ts"
import CategoryCode from "../../../Intangible/DefinedTerm/CategoryCode/index.ts"
import PhysicalActivityCategory from "../../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import Review from "../index.ts"

export default interface Recommendation extends Review {
	/** A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy. */
	category?: Thing | PhysicalActivityCategory | Text | URL | CategoryCode
}
