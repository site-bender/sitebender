import type BaseProps from "../../../../../../../types/index.ts"
import type CatholicChurchProps from "../../../../../../../types/Thing/Place/CivicStructure/PlaceOfWorship/Church/CatholicChurch/index.ts"

import Church from "../index.tsx"

export type Props = CatholicChurchProps & BaseProps

export default function CatholicChurch({
	_type = "CatholicChurch",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Church
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Church>
	)
}
