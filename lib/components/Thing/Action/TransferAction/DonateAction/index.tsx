import type BaseProps from "../../../../../types/index.ts"
import type DonateActionProps from "../../../../../types/Thing/Action/TransferAction/DonateAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = DonateActionProps & BaseProps

export default function DonateAction({
	price,
	priceCurrency,
	priceSpecification,
	recipient,
	_type = "DonateAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				price,
				priceCurrency,
				priceSpecification,
				recipient,
				...subtypeProperties,
			}}
		>{children}</TransferAction>
	)
}
