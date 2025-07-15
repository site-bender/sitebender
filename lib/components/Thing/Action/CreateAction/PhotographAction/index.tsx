import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreateActionProps from "../../../../../types/Thing/CreateAction/index.ts"
import type PhotographActionProps from "../../../../../types/Thing/PhotographAction/index.ts"

import CreateAction from "./index.tsx"

// PhotographAction adds no properties to the CreateAction schema type
export type Props = BaseComponentProps<
	PhotographActionProps,
	"PhotographAction",
	ExtractLevelProps<PhotographActionProps, CreateActionProps>
>

export default function PhotographAction({
	schemaType = "PhotographAction",
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
