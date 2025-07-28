import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { SizeGroupEnumerationProps } from "../index.ts"

import WearableSizeGroupEnumerationComponent from "../../../../../../../components/Thing/Intangible/Enumeration/SizeGroupEnumeration/WearableSizeGroupEnumeration/index.tsx"

export interface WearableSizeGroupEnumerationProps {
}

type WearableSizeGroupEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeGroupEnumerationProps
	& WearableSizeGroupEnumerationProps

export default WearableSizeGroupEnumeration
