import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import ElectricianComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/Electrician/index.tsx"

export interface ElectricianProps {
}

type Electrician =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& ElectricianProps

export default Electrician
