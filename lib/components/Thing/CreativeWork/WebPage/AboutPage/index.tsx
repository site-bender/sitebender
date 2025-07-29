import type BaseProps from "../../../../../types/index.ts"
import type AboutPageProps from "../../../../../types/Thing/CreativeWork/WebPage/AboutPage/index.ts"

import WebPage from "../index.tsx"

export type Props = AboutPageProps & BaseProps

export default function AboutPage({
	_type = "AboutPage",
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
		/>
	)
}
