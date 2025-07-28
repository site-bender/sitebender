import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"

import SurgicalProcedureComponent from "../../../../../../components/Thing/MedicalEntity/MedicalProcedure/SurgicalProcedure/index.tsx"

export interface SurgicalProcedureProps {
}

type SurgicalProcedure =
	& Thing
	& MedicalEntityProps
	& MedicalProcedureProps
	& SurgicalProcedureProps

export default SurgicalProcedure
