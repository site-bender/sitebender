import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type AppendActionProps from "../../../../../../../types/Thing/AppendAction/index.ts"
import type InsertActionProps from "../../../../../../../types/Thing/InsertAction/index.ts"

import InsertAction from "../index.tsx"

// AppendAction adds no properties to the InsertAction schema type
export type Props = BaseComponentProps<
	AppendActionProps,
	"AppendAction",
	ExtractLevelProps<AppendActionProps, InsertActionProps>
>

export default function AppendAction({
	schemaType = "AppendAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<InsertAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
