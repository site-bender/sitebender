import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type QualitativeValueProps from "../../../../../types/Thing/QualitativeValue/index.ts"

import Enumeration from "./index.tsx"

export type Props = BaseComponentProps<
	QualitativeValueProps,
	"QualitativeValue",
	ExtractLevelProps<QualitativeValueProps, EnumerationProps>
>

export default function QualitativeValue(
	{
		additionalProperty,
		equal,
		greater,
		greaterOrEqual,
		lesser,
		lesserOrEqual,
		nonEqual,
		valueReference,
		schemaType = "QualitativeValue",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				additionalProperty,
				equal,
				greater,
				greaterOrEqual,
				lesser,
				lesserOrEqual,
				nonEqual,
				valueReference,
				...subtypeProperties,
			}}
		/>
	)
}
