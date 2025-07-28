import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import FloristComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/Store/Florist/index.tsx"

export interface FloristProps {
}

type Florist =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& FloristProps

export default Florist
