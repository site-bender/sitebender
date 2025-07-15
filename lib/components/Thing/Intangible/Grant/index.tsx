import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type GrantProps from "../../../../types/Thing/Grant/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	GrantProps,
	"Grant",
	ExtractLevelProps<GrantProps, IntangibleProps>
>

export default function Grant(
	{
		fundedItem,
		funder,
		sponsor,
		schemaType = "Grant",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				fundedItem,
				funder,
				sponsor,
				...subtypeProperties,
			}}
		/>
	)
}
