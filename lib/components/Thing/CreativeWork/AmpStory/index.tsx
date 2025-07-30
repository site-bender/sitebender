import type BaseProps from "../../../../types/index.ts"
import type AmpStoryProps from "../../../../types/Thing/CreativeWork/AmpStory/index.ts"

import CreativeWork from "../index.tsx"

export type Props = AmpStoryProps & BaseProps

export default function AmpStory({
	_type = "AmpStory",
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
