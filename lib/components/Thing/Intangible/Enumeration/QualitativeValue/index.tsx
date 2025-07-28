import type BaseProps from "../../../../../types/index.ts"
import type { QualitativeValueProps } from "../../../../../types/Thing/Intangible/Enumeration/QualitativeValue/index.ts"

import Enumeration from "../index.tsx"

export type Props = QualitativeValueProps & BaseProps

export default function QualitativeValue({
	additionalProperty,
	equal,
	greater,
	greaterOrEqual,
	lesser,
	lesserOrEqual,
	nonEqual,
	valueReference,
	_type = "QualitativeValue",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
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
