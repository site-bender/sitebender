import type ArchiveComponent from "../../../CreativeWork/ArchiveComponent/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

import ArchiveComponentComponent from "../../../../../components/Thing/CreativeWork/ArchiveComponent/index.ts"

export interface ArchiveOrganizationProps {
	archiveHeld?: ArchiveComponent | ReturnType<typeof ArchiveComponentComponent>
}

type ArchiveOrganization =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ArchiveOrganizationProps

export default ArchiveOrganization
