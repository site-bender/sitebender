import type BaseProps from "../../../../../types/index.ts"
import type ContactPageProps from "../../../../../types/Thing/CreativeWork/WebPage/ContactPage/index.ts"

import WebPage from "../index.tsx"

export type Props = ContactPageProps & BaseProps

export default function ContactPage({
	_type = "ContactPage",
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
