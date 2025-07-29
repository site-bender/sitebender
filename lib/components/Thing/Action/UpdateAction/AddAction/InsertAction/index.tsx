import type BaseProps from "../../../../../../types/index.ts"
import type InsertActionProps from "../../../../../../types/Thing/Action/UpdateAction/AddAction/InsertAction/index.ts"

import AddAction from "../index.tsx"

export type Props = InsertActionProps & BaseProps

export default function InsertAction({
	toLocation,
	_type = "InsertAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AddAction
			{...props}
			_type={_type}
			subtypeProperties={{
				toLocation,
				...subtypeProperties,
			}}
		/>
	)
}
