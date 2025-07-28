import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { QualitativeValueProps } from "../index.ts"

import BedTypeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/QualitativeValue/BedType/index.tsx"

export interface BedTypeProps {
}

type BedType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& QualitativeValueProps
	& BedTypeProps

export default BedType
