import type BaseProps from "../../../../types/index.ts"
import type StatementProps from "../../../../types/Thing/CreativeWork/Statement/index.ts"

import CreativeWork from "../index.tsx"

export type Props = StatementProps & BaseProps

export default function Statement({
	_type = "Statement",
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
