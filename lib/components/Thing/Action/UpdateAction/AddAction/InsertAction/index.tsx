import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AddActionProps from "../../../../../../types/Thing/AddAction/index.ts"
import type InsertActionProps from "../../../../../../types/Thing/InsertAction/index.ts"

import AddAction from "./index.tsx"

export type Props = BaseComponentProps<
	InsertActionProps,
	"InsertAction",
	ExtractLevelProps<InsertActionProps, AddActionProps>
>

export default function InsertAction(
	{
		toLocation,
		schemaType = "InsertAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
