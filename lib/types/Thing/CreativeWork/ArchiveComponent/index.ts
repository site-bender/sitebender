import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type ArchiveOrganization from "../../Organization/LocalBusiness/ArchiveOrganization/index.ts"
import type Place from "../../Place/index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"

import ArchiveComponentComponent from "../../../../../components/Thing/CreativeWork/ArchiveComponent/index.tsx"

export interface ArchiveComponentProps {
	holdingArchive?: ArchiveOrganization
	itemLocation?: Place | PostalAddress | Text
}

type ArchiveComponent =
	& Thing
	& CreativeWorkProps
	& ArchiveComponentProps

export default ArchiveComponent
