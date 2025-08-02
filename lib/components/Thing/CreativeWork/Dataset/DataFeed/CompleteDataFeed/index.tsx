import type BaseProps from "../../../../../../types/index.ts"
import type CompleteDataFeedProps from "../../../../../../types/Thing/CreativeWork/Dataset/DataFeed/CompleteDataFeed/index.ts"

import DataFeed from "../index.tsx"

export type Props = CompleteDataFeedProps & BaseProps

export default function CompleteDataFeed({
	_type = "CompleteDataFeed",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<DataFeed
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</DataFeed>
	)
}
