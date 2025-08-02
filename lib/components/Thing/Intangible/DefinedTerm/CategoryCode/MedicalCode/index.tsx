import type BaseProps from "../../../../../../types/index.ts"
import type MedicalCodeProps from "../../../../../../types/Thing/Intangible/DefinedTerm/CategoryCode/MedicalCode/index.ts"

import CategoryCode from "../index.tsx"

// MedicalCode adds no properties to the ListItem schema type
export type Props = MedicalCodeProps & BaseProps

export default function MedicalCode(
	{
		codeValue,
		codingSystem,
		_type = "MedicalCode",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CategoryCode
			{...props}
			_type={_type}
			subtypeProperties={{
				codeValue,
				codingSystem,
				...subtypeProperties,
			}}
		>
			{children}
		</CategoryCode>
	)
}
