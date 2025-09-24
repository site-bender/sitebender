import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type MedicalEntity from "../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type MedicalContraindication from "../../../MedicalContraindication/index.ts"
import type { MedicalProcedureProps } from "../../index.ts"
import type { TherapeuticProcedureProps } from "../index.ts"
import type { OccupationalTherapyType } from "./OccupationalTherapy/index.ts"
import type { PalliativeProcedureType } from "./PalliativeProcedure/index.ts"
import type { PhysicalTherapyType } from "./PhysicalTherapy/index.ts"
import type { RadiationTherapyType } from "./RadiationTherapy/index.ts"

import MedicalEntityComponent from "../../../../../../../src/define/Thing/MedicalEntity/index.tsx"
import MedicalContraindicationComponent from "../../../../../../../src/define/Thing/MedicalEntity/MedicalContraindication/index.tsx"
import MedicalTherapyComponent from "../../../../../../../src/define/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.tsx"

export type MedicalTherapyType =
	| "MedicalTherapy"
	| PhysicalTherapyType
	| RadiationTherapyType
	| OccupationalTherapyType
	| PalliativeProcedureType

export interface MedicalTherapyProps {
	"@type"?: MedicalTherapyType
	contraindication?:
		| MedicalContraindication
		| Text
		| ReturnType<typeof MedicalContraindicationComponent>
	duplicateTherapy?:
		| MedicalTherapy
		| ReturnType<typeof MedicalTherapyComponent>
	seriousAdverseOutcome?:
		| MedicalEntity
		| ReturnType<typeof MedicalEntityComponent>
}

type MedicalTherapy =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& TherapeuticProcedureProps
	& MedicalTherapyProps

export default MedicalTherapy
