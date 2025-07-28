import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import TelevisionStationComponent from "../../../../../../components/Thing/Organization/LocalBusiness/TelevisionStation/index.tsx"

export interface TelevisionStationProps {
}

type TelevisionStation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& TelevisionStationProps

export default TelevisionStation
