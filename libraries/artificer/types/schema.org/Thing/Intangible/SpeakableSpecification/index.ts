import type { CssSelectorType, XPathType } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export type SpeakableSpecificationType = "SpeakableSpecification"

export interface SpeakableSpecificationProps {
	"@type"?: SpeakableSpecificationType
	cssSelector?: CssSelectorType
	xpath?: XPathType
}

type SpeakableSpecification =
	& Thing
	& IntangibleProps
	& SpeakableSpecificationProps

export default SpeakableSpecification
