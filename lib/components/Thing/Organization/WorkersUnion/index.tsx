import type BaseProps from "../../../../types/index.ts"
import type WorkersUnionProps from "../../../../types/Thing/Organization/WorkersUnion/index.ts"

import Organization from "../index.tsx"

export type Props = WorkersUnionProps & BaseProps

export default function WorkersUnion({
	_type = "WorkersUnion",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
