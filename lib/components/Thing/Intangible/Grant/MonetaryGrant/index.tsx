import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type GrantProps from "../../../../../types/Thing/Grant/index.ts"
import type MonetaryGrantProps from "../../../../../types/Thing/MonetaryGrant/index.ts"

import Grant from "./index.tsx"

export type Props = BaseComponentProps<
	MonetaryGrantProps,
	"MonetaryGrant",
	ExtractLevelProps<MonetaryGrantProps, GrantProps>
>

export default function MonetaryGrant(
	{
		amount,
		funder,
		schemaType = "MonetaryGrant",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Grant
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				amount,
				funder,
				...subtypeProperties,
			}}
		/>
	)
}
