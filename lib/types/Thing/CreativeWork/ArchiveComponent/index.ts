import type { Text } from "../../../DataType/index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type ArchiveOrganization from "../../Organization/LocalBusiness/ArchiveOrganization/index.ts"
import type Place from "../../Place/index.ts"
import type CreativeWork from "../index.ts"

export default interface ArchiveComponent extends CreativeWork {
	/** [[ArchiveOrganization]] that holds, keeps or maintains the [[ArchiveComponent]]. */
	holdingArchive?: ArchiveOrganization
	/** Current location of the item. */
	itemLocation?: PostalAddress | Place | Text
}
