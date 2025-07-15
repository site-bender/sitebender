import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type QuotationProps from "../../../../types/Thing/Quotation/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	QuotationProps,
	"Quotation",
	ExtractLevelProps<QuotationProps, CreativeWorkProps>
>

export default function Quotation(
	{
		spokenByCharacter,
		schemaType = "Quotation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				spokenByCharacter,
				...subtypeProperties,
			}}
		/>
	)
}
