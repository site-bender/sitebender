// Courthouse extends GovernmentBuilding but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { CivicStructureProps } from "../../index.ts"
import type { GovernmentBuildingProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CourthouseProps {}

type Courthouse =
	& Thing
	& CivicStructureProps
	& GovernmentBuildingProps
	& PlaceProps
	& CourthouseProps

export default Courthouse
