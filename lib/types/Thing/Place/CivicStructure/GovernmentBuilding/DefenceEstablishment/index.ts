import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

export type DefenceEstablishmentType = "DefenceEstablishment"

export interface DefenceEstablishmentProps {
	"@type"?: DefenceEstablishmentType
}

type DefenceEstablishment =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& GovernmentBuildingProps
	& DefenceEstablishmentProps

export default DefenceEstablishment
