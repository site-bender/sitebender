import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type LibrarySystemType = "LibrarySystem"

export interface LibrarySystemProps {
	"@type"?: LibrarySystemType
}

type LibrarySystem = Thing & OrganizationProps & LibrarySystemProps

export default LibrarySystem
