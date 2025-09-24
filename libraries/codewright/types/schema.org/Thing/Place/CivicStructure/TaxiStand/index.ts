import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type TaxiStandType = "TaxiStand"

export interface TaxiStandProps {
	"@type"?: TaxiStandType
}

type TaxiStand = Thing & PlaceProps & CivicStructureProps & TaxiStandProps

export default TaxiStand
