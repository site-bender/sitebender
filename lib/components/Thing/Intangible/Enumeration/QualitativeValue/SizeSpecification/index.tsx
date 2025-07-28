import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { EnumerationProps } from "../../../../../../types/Thing/Intangible/Enumeration/index.ts"
import type { QualitativeValueProps } from "../../../../../../types/Thing/Intangible/Enumeration/QualitativeValue/index.ts"
import type { SizeSpecificationProps } from "../../../../../../types/Thing/Intangible/Enumeration/QualitativeValue/SizeSpecification/index.ts"

import QualitativeValue from "../index.tsx"

export type Props = BaseComponentProps<
	SizeSpecificationProps,
	"SizeSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, EnumerationProps, QualitativeValueProps>
>

export default function SizeSpecification({
	hasMeasurement,
	sizeGroup,
	sizeSystem,
	suggestedAge,
	suggestedGender,
	suggestedMeasurement,
	schemaType = "SizeSpecification",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<QualitativeValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasMeasurement,
				sizeGroup,
				sizeSystem,
				suggestedAge,
				suggestedGender,
				suggestedMeasurement,
				...subtypeProperties,
			}}
		/>
	)
}
