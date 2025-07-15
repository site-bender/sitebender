import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreateActionProps from "../../../../../types/Thing/CreateAction/index.ts"
import type PaintActionProps from "../../../../../types/Thing/PaintAction/index.ts"

import CreateAction from "./index.tsx"

// PaintAction adds no properties to the CreateAction schema type
export type Props = BaseComponentProps<
	PaintActionProps,
	"PaintAction",
	ExtractLevelProps<PaintActionProps, CreateActionProps>
>

export default function PaintAction({
	schemaType = "PaintAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
