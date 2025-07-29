import type BaseProps from "../../../../types/index.ts"
import type ThesisProps from "../../../../types/Thing/CreativeWork/Thesis/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ThesisProps & BaseProps

export default function Thesis({
	inSupportOf,
	_type = "Thesis",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				inSupportOf,
				...subtypeProperties,
			}}
		/>
	)
}
