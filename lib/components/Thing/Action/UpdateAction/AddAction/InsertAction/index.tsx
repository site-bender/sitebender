import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../../types/Thing/Action/index.ts"
import type { UpdateActionProps } from "../../../../../../types/Thing/Action/UpdateAction/index.ts"
import type { AddActionProps } from "../../../../../../types/Thing/Action/UpdateAction/AddAction/index.ts"
import type { InsertActionProps } from "../../../../../../types/Thing/Action/UpdateAction/AddAction/InsertAction/index.ts"

import AddAction from "../index.tsx"

export type Props = BaseComponentProps<
	InsertActionProps,
	"InsertAction",
	ExtractLevelProps<ThingProps, ActionProps, UpdateActionProps, AddActionProps>
>

export default function InsertAction({
	toLocation,
	schemaType = "InsertAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<AddAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				toLocation,
				...subtypeProperties,
			}}
		/>
	)
}
