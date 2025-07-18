import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CorporationProps from "../../../../types/Thing/Corporation/index.ts"
import type OrganizationProps from "../../../../types/Thing/Organization/index.ts"

import Organization from "../index.tsx"

export type Props = BaseComponentProps<
	CorporationProps,
	"Corporation",
	ExtractLevelProps<CorporationProps, OrganizationProps>
>

export default function Corporation(
	{
		tickerSymbol,
		schemaType = "Corporation",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
