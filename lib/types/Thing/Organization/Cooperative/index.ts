import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import CooperativeComponent from "../../../../../components/Thing/Organization/Cooperative/index.tsx"

export interface CooperativeProps {
}

type Cooperative =
	& Thing
	& OrganizationProps
	& CooperativeProps

export default Cooperative
