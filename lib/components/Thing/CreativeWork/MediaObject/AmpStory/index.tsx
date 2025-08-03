import type BaseProps from "../../../../../types/index.ts"
import type { AmpStory as AmpStoryProps } from "../../../../../types/index.ts"

import MediaObject from "../index.tsx"

// AmpStory adds no properties to the MediaObject schema type
export type Props = AmpStoryProps & BaseProps

export default function AmpStory({
	_type = "AmpStory",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
