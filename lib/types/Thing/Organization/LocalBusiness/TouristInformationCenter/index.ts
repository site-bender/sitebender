import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import TouristInformationCenterComponent from "../../../../../../components/Thing/Organization/LocalBusiness/TouristInformationCenter/index.tsx"

export interface TouristInformationCenterProps {
}

type TouristInformationCenter =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& TouristInformationCenterProps

export default TouristInformationCenter
