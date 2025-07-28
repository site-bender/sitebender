import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"

export interface GasStationProps {}

type GasStation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& GasStationProps

export default GasStation
