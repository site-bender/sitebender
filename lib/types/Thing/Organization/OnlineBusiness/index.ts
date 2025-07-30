import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface OnlineBusinessProps {
	"@type"?: "OnlineBusiness"}

type OnlineBusiness = Thing & OrganizationProps & OnlineBusinessProps

export default OnlineBusiness
