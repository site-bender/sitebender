import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface AutomotiveBusinessProps {
	"@type"?: "AutomotiveBusiness"}

type AutomotiveBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& AutomotiveBusinessProps

export default AutomotiveBusiness
