import type Thing from "../../../../index.ts"
import type AnatomicalSystem from "../../../AnatomicalSystem/index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type Vessel from "../index.ts"
import type { VesselProps } from "../index.ts"

import AnatomicalStructureComponent from "../../../../../../components/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import VesselComponent from "../../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.ts"
import AnatomicalSystemComponent from "../../../../../../components/Thing/MedicalEntity/AnatomicalSystem/index.ts"

export interface VeinProps {
	"@type"?: "Vein"
	drainsTo?: Vessel | ReturnType<typeof VesselComponent>
	regionDrained?:
		| AnatomicalStructure
		| AnatomicalSystem
		| ReturnType<typeof AnatomicalStructureComponent>
		| ReturnType<typeof AnatomicalSystemComponent>
	tributary?:
		| AnatomicalStructure
		| ReturnType<typeof AnatomicalStructureComponent>
}

type Vein =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& VesselProps
	& VeinProps

export default Vein
