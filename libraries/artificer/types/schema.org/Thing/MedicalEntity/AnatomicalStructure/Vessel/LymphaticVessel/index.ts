import type Thing from "../../../../index.ts"
import type AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type Vessel from "../index.ts"
import type { VesselProps } from "../index.ts"

import AnatomicalStructureComponent from "../../../../../../../../pagewright/src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"
import VesselComponent from "../../../../../../../../pagewright/src/define/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.tsx"
import AnatomicalSystemComponent from "../../../../../../../../pagewright/src/define/Thing/MedicalEntity/AnatomicalSystem/index.tsx"

export type LymphaticVesselType = "LymphaticVessel"

export interface LymphaticVesselProps {
	"@type"?: LymphaticVesselType
	originatesFrom?: Vessel | ReturnType<typeof VesselComponent>
	regionDrained?:
		| AnatomicalStructure
		| AnatomicalSystem
		| ReturnType<typeof AnatomicalStructureComponent>
		| ReturnType<typeof AnatomicalSystemComponent>
	runsTo?: Vessel | ReturnType<typeof VesselComponent>
}

type LymphaticVessel =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& VesselProps
	& LymphaticVesselProps

export default LymphaticVessel
