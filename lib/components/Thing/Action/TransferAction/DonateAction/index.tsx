import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DonateActionProps from "../../../../../types/Thing/DonateAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	DonateActionProps,
	"DonateAction",
	ExtractLevelProps<DonateActionProps, TransferActionProps>
>

export default function DonateAction(
	{
		price,
		priceCurrency,
		priceSpecification,
		recipient,
		schemaType = "DonateAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				price,
				priceCurrency,
				priceSpecification,
				recipient,
				...subtypeProperties,
			}}
		/>
	)
}
