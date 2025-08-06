import type Thing from "../../../../index.ts"
import type AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type Vessel from "../index.ts"
import type { VesselProps } from "../index.ts"

import { AnatomicalStructure as AnatomicalStructureComponent } from "../../../../../../../components/index.tsx"
import { Vessel as VesselComponent } from "../../../../../../../components/index.tsx"
import { AnatomicalSystem as AnatomicalSystemComponent } from "../../../../../../../components/index.tsx"

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
