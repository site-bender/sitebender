import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import TaxiStandComponent from "../../../../../../components/Thing/Place/CivicStructure/TaxiStand/index.tsx"

export interface TaxiStandProps {
}

type TaxiStand =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& TaxiStandProps

export default TaxiStand
