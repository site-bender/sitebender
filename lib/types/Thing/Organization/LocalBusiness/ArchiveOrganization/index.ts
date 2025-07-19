import type ArchiveComponent from "../../../CreativeWork/ArchiveComponent/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../Place/LocalBusiness/index.ts"

export interface ArchiveOrganizationProps {
	/** Collection, [fonds](https://en.wikipedia.org/wiki/Fonds), or item held, kept or maintained by an [[ArchiveOrganization]]. */
	archiveHeld?: ArchiveComponent
}

type ArchiveOrganization =
	& Thing
	& LocalBusinessProps
	& PlaceProps
	& ArchiveOrganizationProps

export default ArchiveOrganization
