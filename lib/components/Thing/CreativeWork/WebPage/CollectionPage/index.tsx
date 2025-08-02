import type BaseProps from "../../../../../types/index.ts"
import type CollectionPageProps from "../../../../../types/Thing/CreativeWork/WebPage/CollectionPage/index.ts"

import WebPage from "../index.tsx"

export type Props = CollectionPageProps & BaseProps

export default function CollectionPage({
	_type = "CollectionPage",
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
