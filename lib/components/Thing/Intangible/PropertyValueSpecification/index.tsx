import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type PropertyValueSpecificationProps from "../../../../types/Thing/PropertyValueSpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	PropertyValueSpecificationProps,
	"PropertyValueSpecification",
	ExtractLevelProps<PropertyValueSpecificationProps, IntangibleProps>
>

export default function PropertyValueSpecification(
	{
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
		schemaType = "PropertyValueSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
