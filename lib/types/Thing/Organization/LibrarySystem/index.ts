import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import LibrarySystemComponent from "../../../../../components/Thing/Organization/LibrarySystem/index.tsx"

export interface LibrarySystemProps {
}

type LibrarySystem =
	& Thing
	& OrganizationProps
	& LibrarySystemProps

export default LibrarySystem
