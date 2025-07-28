import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type PostalAddress from "../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type ArchiveOrganization from "../../Organization/LocalBusiness/ArchiveOrganization/index.ts"
import type Place from "../../Place/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import PostalAddressComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import ArchiveOrganizationComponent from "../../../../components/Thing/Organization/LocalBusiness/ArchiveOrganization/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface ArchiveComponentProps {
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
