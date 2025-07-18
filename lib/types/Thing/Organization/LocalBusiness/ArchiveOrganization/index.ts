import type ArchiveComponent from "../../../CreativeWork/ArchiveComponent/index.ts"
import type LocalBusiness from "../index.ts"

export default interface ArchiveOrganization extends LocalBusiness {
	/** Collection, [fonds](https://en.wikipedia.org/wiki/Fonds), or item held, kept or maintained by an [[ArchiveOrganization]]. */
	archiveHeld?: ArchiveComponent
}
