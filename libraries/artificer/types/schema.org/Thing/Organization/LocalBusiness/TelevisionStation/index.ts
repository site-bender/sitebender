import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type TelevisionStationType = "TelevisionStation"

export interface TelevisionStationProps {
	"@type"?: TelevisionStationType
}

type TelevisionStation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& TelevisionStationProps

export default TelevisionStation
