import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

export interface LigamentProps {}

type Ligament =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& LigamentProps

export default Ligament
