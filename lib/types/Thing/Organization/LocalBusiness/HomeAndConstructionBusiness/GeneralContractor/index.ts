import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"

export interface GeneralContractorProps {}

type GeneralContractor =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& GeneralContractorProps

export default GeneralContractor
