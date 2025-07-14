import { Text } from "../../../DataType/index.ts"
import CreativeWork from "../index.ts"

export default interface WebSite extends CreativeWork {
	/** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
	issn?: Text
}
