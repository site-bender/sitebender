import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import RadioStationComponent from "../../../../../../components/Thing/Organization/LocalBusiness/RadioStation/index.tsx"

export interface RadioStationProps {
}

type RadioStation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& RadioStationProps

export default RadioStation
