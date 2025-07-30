import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export interface TouristInformationCenterProps {
	"@type"?: "TouristInformationCenter"}

type TouristInformationCenter =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& TouristInformationCenterProps

export default TouristInformationCenter
