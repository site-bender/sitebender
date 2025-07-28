import type BaseProps from "../../../../../types/index.ts"
import type { CategoryCodeProps } from "../../../../../types/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"

import DefinedTerm from "../index.tsx"

export type Props = CategoryCodeProps & BaseProps

export default function CategoryCode({
	codeValue,
	inCodeSet,
	_type = "CategoryCode",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<DefinedTerm
			{...props}
			_type={_type}
			subtypeProperties={{
				codeValue,
				inCodeSet,
				...subtypeProperties,
			}}
		/>
	)
}
