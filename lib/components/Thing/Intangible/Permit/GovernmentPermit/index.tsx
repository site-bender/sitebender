import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type GovernmentPermitProps from "../../../../../types/Thing/GovernmentPermit/index.ts"
import type PermitProps from "../../../../../types/Thing/Permit/index.ts"

import Permit from "../index.tsx"

// GovernmentPermit adds no properties to the Permit schema type
export type Props = BaseComponentProps<
	GovernmentPermitProps,
	"GovernmentPermit",
	ExtractLevelProps<GovernmentPermitProps, PermitProps>
>

export default function GovernmentPermit({
	schemaType = "GovernmentPermit",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Permit
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
