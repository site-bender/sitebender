import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import InternetCafeComponent from "../../../../../../components/Thing/Organization/LocalBusiness/InternetCafe/index.tsx"

export interface InternetCafeProps {
}

type InternetCafe =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& InternetCafeProps

export default InternetCafe
