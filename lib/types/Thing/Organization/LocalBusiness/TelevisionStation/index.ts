import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface TelevisionStationProps {}

type TelevisionStation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& TelevisionStationProps

export default TelevisionStation
