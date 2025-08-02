import type BaseProps from "../../../../../../types/index.ts"
import type SizeSpecificationProps from "../../../../../../types/Thing/Intangible/Enumeration/QualitativeValue/SizeSpecification/index.ts"

import QualitativeValue from "../index.tsx"

export type Props = SizeSpecificationProps & BaseProps

export default function SizeSpecification({
	hasMeasurement,
	sizeGroup,
	sizeSystem,
	suggestedAge,
	suggestedGender,
	suggestedMeasurement,
	_type = "SizeSpecification",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<QualitativeValue
			{...props}
			_type={_type}
			subtypeProperties={{
				hasMeasurement,
				sizeGroup,
				sizeSystem,
				suggestedAge,
				suggestedGender,
				suggestedMeasurement,
				...subtypeProperties,
			}}
		>
			{children}
		</QualitativeValue>
	)
}
