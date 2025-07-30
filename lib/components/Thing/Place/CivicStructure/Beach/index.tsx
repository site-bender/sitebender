import type BaseProps from "../../../../../types/index.ts"
import type BeachProps from "../../../../../types/Thing/Place/CivicStructure/Beach/index.ts"

import CivicStructure from "../index.tsx"

export type Props = BeachProps & BaseProps

export default function Beach({
	_type = "Beach",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</CivicStructure>
	)
}
