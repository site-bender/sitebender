import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicalDevicePurposeType = "MedicalDevicePurpose"

export interface MedicalDevicePurposeProps {
	"@type"?: MedicalDevicePurposeType
}

type MedicalDevicePurpose =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalDevicePurposeProps

export default MedicalDevicePurpose
