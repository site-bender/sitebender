import type BaseProps from "../../../../../types/index.ts"
import type FAQPageProps from "../../../../../types/Thing/CreativeWork/WebPage/FAQPage/index.ts"

import WebPage from "../index.tsx"

export type Props = FAQPageProps & BaseProps

export default function FAQPage({
	_type = "FAQPage",
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
