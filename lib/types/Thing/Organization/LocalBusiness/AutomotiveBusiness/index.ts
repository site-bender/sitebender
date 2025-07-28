import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import AutomotiveBusinessComponent from "../../../../../../components/Thing/Organization/LocalBusiness/AutomotiveBusiness/index.tsx"

export interface AutomotiveBusinessProps {
}

type AutomotiveBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& AutomotiveBusinessProps

export default AutomotiveBusiness
