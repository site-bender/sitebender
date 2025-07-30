import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface MedicalIndicationProps {
	"@type"?: "MedicalIndication"}

type MedicalIndication = Thing & MedicalEntityProps & MedicalIndicationProps

export default MedicalIndication
