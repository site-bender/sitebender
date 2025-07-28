import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type ArchiveComponent from "../../../CreativeWork/ArchiveComponent/index.ts"

import ArchiveOrganizationComponent from "../../../../../../components/Thing/Organization/LocalBusiness/ArchiveOrganization/index.tsx"

export interface ArchiveOrganizationProps {
	archiveHeld?: ArchiveComponent
}

type ArchiveOrganization =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ArchiveOrganizationProps

export default ArchiveOrganization
