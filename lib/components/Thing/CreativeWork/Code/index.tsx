import type BaseProps from "../../../../types/index.ts"
import type { CodeProps } from "../../../../types/Thing/CreativeWork/Code/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CodeProps & BaseProps

export default function Code({
	_type = "Code",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
