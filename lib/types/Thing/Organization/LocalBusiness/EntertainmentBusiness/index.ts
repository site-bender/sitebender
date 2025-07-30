import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface EntertainmentBusinessProps {
	"@type"?: "EntertainmentBusiness"}

type EntertainmentBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& EntertainmentBusinessProps

export default EntertainmentBusiness
