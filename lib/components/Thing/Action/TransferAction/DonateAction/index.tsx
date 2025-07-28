import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../../types/Thing/Action/TransferAction/index.ts"
import type { DonateActionProps } from "../../../../../types/Thing/Action/TransferAction/DonateAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	DonateActionProps,
	"DonateAction",
	ExtractLevelProps<ThingProps, ActionProps, TransferActionProps>
>

export default function DonateAction({
	price,
	priceCurrency,
	priceSpecification,
	recipient,
	schemaType = "DonateAction",
	subtypeProperties = {},
	...props
}): Props {
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
