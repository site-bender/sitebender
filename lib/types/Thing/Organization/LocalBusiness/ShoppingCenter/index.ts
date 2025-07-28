import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import ShoppingCenterComponent from "../../../../../../components/Thing/Organization/LocalBusiness/ShoppingCenter/index.tsx"

export interface ShoppingCenterProps {
}

type ShoppingCenter =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& ShoppingCenterProps

export default ShoppingCenter
