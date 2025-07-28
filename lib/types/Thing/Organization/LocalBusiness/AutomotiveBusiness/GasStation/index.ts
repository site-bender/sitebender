import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { AutomotiveBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import GasStationComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/AutomotiveBusiness/GasStation/index.tsx"

export interface GasStationProps {
}

type GasStation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& AutomotiveBusinessProps
	& OrganizationProps
	& GasStationProps

export default GasStation
