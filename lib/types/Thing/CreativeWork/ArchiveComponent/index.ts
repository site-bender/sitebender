import { Text } from "../../../DataType/index.ts"
import PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import ArchiveOrganization from "../../Organization/LocalBusiness/ArchiveOrganization/index.ts"
import Place from "../../Place/index.ts"
import CreativeWork from "../index.ts"

export default interface ArchiveComponent extends CreativeWork {
	/** [[ArchiveOrganization]] that holds, keeps or maintains the [[ArchiveComponent]]. */
	holdingArchive?: ArchiveOrganization
	/** Current location of the item. */
	itemLocation?: PostalAddress | Place | Text
}
