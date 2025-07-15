import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DepartActionProps from "../../../../../types/Thing/DepartAction/index.ts"
import type MoveActionProps from "../../../../../types/Thing/MoveAction/index.ts"

import MoveAction from "./index.tsx"

// DepartAction adds no properties to the MoveAction schema type
export type Props = BaseComponentProps<
	DepartActionProps,
	"DepartAction",
	ExtractLevelProps<DepartActionProps, MoveActionProps>
>

export default function DepartAction({
	schemaType = "DepartAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MoveAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
