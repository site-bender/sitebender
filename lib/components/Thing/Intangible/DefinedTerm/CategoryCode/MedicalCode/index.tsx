import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CategoryCodeProps from "../../../../../../types/Thing/CategoryCode/index.ts"
import type MedicalCodeProps from "../../../../../../types/Thing/MedicalCode/index.ts"

import CategoryCode from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalCodeProps,
	"MedicalCode",
	ExtractLevelProps<MedicalCodeProps, CategoryCodeProps>
>

export default function MedicalCode(
	{
		codeValue,
		codingSystem,
		_type = "MedicalCode",
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
		/>
	)
}
