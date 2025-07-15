import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type InsertActionProps from "../../../../../../../types/Thing/InsertAction/index.ts"
import type PrependActionProps from "../../../../../../../types/Thing/PrependAction/index.ts"

import InsertAction from "./index.tsx"

// PrependAction adds no properties to the InsertAction schema type
export type Props = BaseComponentProps<
	PrependActionProps,
	"PrependAction",
	ExtractLevelProps<PrependActionProps, InsertActionProps>
>

export default function PrependAction({
	schemaType = "PrependAction",
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
