import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type NGOType = "NGO"

export interface NGOProps {
	"@type"?: NGOType
}

type NGO = Thing & OrganizationProps & NGOProps

export default NGO
