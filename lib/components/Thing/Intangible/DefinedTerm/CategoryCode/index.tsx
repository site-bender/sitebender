import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CategoryCodeProps from "../../../../../types/Thing/CategoryCode/index.ts"
import type DefinedTermProps from "../../../../../types/Thing/DefinedTerm/index.ts"

import DefinedTerm from "./index.tsx"

export type Props = BaseComponentProps<
	CategoryCodeProps,
	"CategoryCode",
	ExtractLevelProps<CategoryCodeProps, DefinedTermProps>
>

export default function CategoryCode(
	{
		codeValue,
		inCodeSet,
		schemaType = "CategoryCode",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<DefinedTerm
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				codeValue,
				inCodeSet,
				...subtypeProperties,
			}}
		/>
	)
}
