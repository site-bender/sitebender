import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"

export interface AutoWashProps {}

type AutoWash =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& AutoWashProps

export default AutoWash
