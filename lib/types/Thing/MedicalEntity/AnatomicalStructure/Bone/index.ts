import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"

export interface BoneProps {}

type Bone = Thing & MedicalEntityProps & AnatomicalStructureProps & BoneProps

export default Bone
