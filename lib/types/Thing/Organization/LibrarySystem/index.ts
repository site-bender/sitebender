import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface LibrarySystemProps {
}

type LibrarySystem =
	& Thing
	& OrganizationProps
	& LibrarySystemProps

export default LibrarySystem
