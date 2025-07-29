import type BaseProps from "../../../../../types/index.ts"
import type QAPageProps from "../../../../../types/Thing/CreativeWork/WebPage/QAPage/index.ts"

import WebPage from "../index.tsx"

export type Props = QAPageProps & BaseProps

export default function QAPage({
	_type = "QAPage",
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
