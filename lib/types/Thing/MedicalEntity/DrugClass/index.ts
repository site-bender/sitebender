import type Thing from "../../index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface DrugClassProps {
	/** Specifying a drug or medicine used in a medication procedure. */
	drug?: Drug
}

type DrugClass =
	& Thing
	& MedicalEntityProps
	& DrugClassProps

export default DrugClass
