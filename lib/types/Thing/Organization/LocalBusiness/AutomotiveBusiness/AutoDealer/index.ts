import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

export interface AutoDealerProps {
}

type AutoDealer =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& AutoDealerProps

export default AutoDealer
