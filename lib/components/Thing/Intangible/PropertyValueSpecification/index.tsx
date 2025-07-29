import type BaseProps from "../../../../types/index.ts"
import type PropertyValueSpecificationProps from "../../../../types/Thing/Intangible/PropertyValueSpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = PropertyValueSpecificationProps & BaseProps

export default function PropertyValueSpecification({
	defaultValue,
	maxValue,
	minValue,
	multipleValues,
	readonlyValue,
	stepValue,
	valueMaxLength,
	valueMinLength,
	valueName,
	valuePattern,
	valueRequired,
	_type = "PropertyValueSpecification",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				defaultValue,
				maxValue,
				minValue,
				multipleValues,
				readonlyValue,
				stepValue,
				valueMaxLength,
				valueMinLength,
				valueName,
				valuePattern,
				valueRequired,
				...subtypeProperties,
			}}
		/>
	)
}
