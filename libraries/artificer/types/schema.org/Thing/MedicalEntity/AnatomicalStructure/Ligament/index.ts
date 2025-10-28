import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

export type LigamentType = "Ligament"

export interface LigamentProps {
	"@type"?: LigamentType
}

type Ligament =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& LigamentProps

export default Ligament
