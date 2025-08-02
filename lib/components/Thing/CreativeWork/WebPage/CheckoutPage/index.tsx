import type BaseProps from "../../../../../types/index.ts"
import type CheckoutPageProps from "../../../../../types/Thing/CreativeWork/WebPage/CheckoutPage/index.ts"

import WebPage from "../index.tsx"

export type Props = CheckoutPageProps & BaseProps

export default function CheckoutPage({
	_type = "CheckoutPage",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<WebPage
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</WebPage>
	)
}
