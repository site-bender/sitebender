import type ArchiveComponent from "../../../CreativeWork/ArchiveComponent/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

import ArchiveComponentComponent from "../../../../../../../architect/src/define/Thing/CreativeWork/ArchiveComponent/index.tsx"

export type ArchiveOrganizationType = "ArchiveOrganization"

export interface ArchiveOrganizationProps {
	"@type"?: ArchiveOrganizationType
	archiveHeld?:
		| ArchiveComponent
		| ReturnType<typeof ArchiveComponentComponent>
}

type ArchiveOrganization =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ArchiveOrganizationProps

export default ArchiveOrganization
