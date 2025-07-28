import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { EntertainmentBusinessProps } from "../index.ts"

export interface AmusementParkProps {}

type AmusementPark =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& EntertainmentBusinessProps
	& OrganizationProps
	& AmusementParkProps

export default AmusementPark
