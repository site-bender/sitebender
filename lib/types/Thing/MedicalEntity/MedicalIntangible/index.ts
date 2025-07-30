import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface MedicalIntangibleProps {
	"@type"?: "MedicalIntangible"}

type MedicalIntangible = Thing & MedicalEntityProps & MedicalIntangibleProps

export default MedicalIntangible
