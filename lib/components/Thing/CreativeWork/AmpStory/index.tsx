import type BaseProps from "../../../../types/index.ts"
import type { AmpStory as AmpStoryProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = AmpStoryProps & BaseProps

export default function AmpStory({
	_type = "AmpStory",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
