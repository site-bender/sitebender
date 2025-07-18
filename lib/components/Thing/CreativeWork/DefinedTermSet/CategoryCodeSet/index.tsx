import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CategoryCodeSetProps from "../../../../../types/Thing/CategoryCodeSet/index.ts"
import type DefinedTermSetProps from "../../../../../types/Thing/DefinedTermSet/index.ts"

import DefinedTermSet from "../index.tsx"

export type Props = BaseComponentProps<
	CategoryCodeSetProps,
	"CategoryCodeSet",
	ExtractLevelProps<CategoryCodeSetProps, DefinedTermSetProps>
>

export default function CategoryCodeSet(
	{
		hasCategoryCode,
		schemaType = "CategoryCodeSet",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<DefinedTermSet
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasCategoryCode,
				...subtypeProperties,
			}}
		/>
	)
}
