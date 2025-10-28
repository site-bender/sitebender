import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type ArchiveOrganization from "../../Organization/LocalBusiness/ArchiveOrganization/index.ts"
import type Place from "../../Place/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import PostalAddressComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"
import PlaceComponent from "../../../../../../architect/src/define/Thing/Place/index.tsx"
import { ArchiveOrganization as ArchiveOrganizationComponent } from "../../../../../architect/index.tsx"

export type ArchiveComponentType = "ArchiveComponent"

export interface ArchiveComponentProps {
	"@type"?: ArchiveComponentType
	holdingArchive?:
		| ArchiveOrganization
		| ReturnType<typeof ArchiveOrganizationComponent>
	itemLocation?:
		| Place
		| PostalAddress
		| Text
		| ReturnType<typeof PlaceComponent>
		| ReturnType<typeof PostalAddressComponent>
}

type ArchiveComponent = Thing & CreativeWorkProps & ArchiveComponentProps

export default ArchiveComponent
