import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../types/Thing/Organization/index.ts"
import type { CorporationProps } from "../../../../types/Thing/Organization/Corporation/index.ts"

import Organization from "../index.tsx"

export type Props = BaseComponentProps<
	CorporationProps,
	"Corporation",
	ExtractLevelProps<ThingProps, OrganizationProps>
>

export default function Corporation({
	tickerSymbol,
	schemaType = "Corporation",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Organization
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				tickerSymbol,
				...subtypeProperties,
			}}
		/>
	)
}
