import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type CooperativeType = "Cooperative"

export interface CooperativeProps {
	"@type"?: CooperativeType
}

type Cooperative = Thing & OrganizationProps & CooperativeProps

export default Cooperative
