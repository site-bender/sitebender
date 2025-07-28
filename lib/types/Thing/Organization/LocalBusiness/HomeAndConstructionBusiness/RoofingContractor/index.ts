import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import RoofingContractorComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/RoofingContractor/index.tsx"

export interface RoofingContractorProps {
}

type RoofingContractor =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& RoofingContractorProps

export default RoofingContractor
