import type { CssSelectorType, XPathType } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import SpeakableSpecificationComponent from "../../../../../components/Thing/Intangible/SpeakableSpecification/index.tsx"

export interface SpeakableSpecificationProps {
	cssSelector?: CssSelectorType
	xpath?: XPathType
}

type SpeakableSpecification =
	& Thing
	& IntangibleProps
	& SpeakableSpecificationProps

export default SpeakableSpecification
