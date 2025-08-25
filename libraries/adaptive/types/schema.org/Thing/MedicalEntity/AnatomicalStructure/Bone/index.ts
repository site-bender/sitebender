import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

export type BoneType = "Bone"

export interface BoneProps {
	"@type"?: BoneType
}

type Bone = Thing & MedicalEntityProps & AnatomicalStructureProps & BoneProps

export default Bone
