import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import NGOComponent from "../../../../../components/Thing/Organization/NGO/index.tsx"

export interface NGOProps {
}

type NGO =
	& Thing
	& OrganizationProps
	& NGOProps

export default NGO
