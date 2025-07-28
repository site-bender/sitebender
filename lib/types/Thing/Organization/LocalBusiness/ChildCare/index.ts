import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import ChildCareComponent from "../../../../../../components/Thing/Organization/LocalBusiness/ChildCare/index.tsx"

export interface ChildCareProps {
}

type ChildCare =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ChildCareProps

export default ChildCare
