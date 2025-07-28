import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalDevicePurposeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalDevicePurpose/index.tsx"

export interface MedicalDevicePurposeProps {
}

type MedicalDevicePurpose =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalDevicePurposeProps

export default MedicalDevicePurpose
