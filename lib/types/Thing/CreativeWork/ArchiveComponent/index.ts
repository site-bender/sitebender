import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type ArchiveOrganization from "../../Organization/LocalBusiness/ArchiveOrganization/index.ts"
import type Place from "../../Place/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ArchiveComponentProps {
	/** [[ArchiveOrganization]] that holds, keeps or maintains the [[ArchiveComponent]]. */
	holdingArchive?: ArchiveOrganization
	/** Current location of the item. */
	itemLocation?: PostalAddress | Place | Text
}

type ArchiveComponent =
	& Thing
	& CreativeWorkProps
	& ArchiveComponentProps

export default ArchiveComponent
