import type BaseProps from "../../../../types/index.ts"
import type ShortStoryProps from "../../../../types/Thing/CreativeWork/ShortStory/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ShortStoryProps & BaseProps

export default function ShortStory({
	_type = "ShortStory",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</CreativeWork>
	)
}
