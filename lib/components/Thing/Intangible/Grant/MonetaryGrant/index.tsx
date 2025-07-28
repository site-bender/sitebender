import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { GrantProps } from "../../../../../types/Thing/Intangible/Grant/index.ts"
import type { MonetaryGrantProps } from "../../../../../types/Thing/Intangible/Grant/MonetaryGrant/index.ts"

import Grant from "../index.tsx"

export type Props = BaseComponentProps<
	MonetaryGrantProps,
	"MonetaryGrant",
	ExtractLevelProps<ThingProps, IntangibleProps, GrantProps>
>

export default function MonetaryGrant({
	amount,
	funder,
	schemaType = "MonetaryGrant",
	subtypeProperties = {},
	...props
}): Props {
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
