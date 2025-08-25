import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type RadioStationType = "RadioStation"

export interface RadioStationProps {
	"@type"?: RadioStationType
}

type RadioStation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& RadioStationProps

export default RadioStation
