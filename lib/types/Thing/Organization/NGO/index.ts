import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface NGOProps {
	"@type"?: "NGO"}

type NGO = Thing & OrganizationProps & NGOProps

export default NGO
