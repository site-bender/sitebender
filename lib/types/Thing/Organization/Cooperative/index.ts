import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface CooperativeProps {
}

type Cooperative =
	& Thing
	& OrganizationProps
	& CooperativeProps

export default Cooperative
