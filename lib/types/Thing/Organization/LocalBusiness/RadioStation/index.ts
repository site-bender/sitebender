import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface RadioStationProps {
	"@type"?: "RadioStation"}

type RadioStation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& RadioStationProps

export default RadioStation
