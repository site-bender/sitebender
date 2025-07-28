import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import ConsortiumComponent from "../../../../../components/Thing/Organization/Consortium/index.tsx"

export interface ConsortiumProps {
}

type Consortium =
	& Thing
	& OrganizationProps
	& ConsortiumProps

export default Consortium
