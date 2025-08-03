import type BaseProps from "../../../../../../types/index.ts"
import type { Audiobook as AudiobookProps } from "../../../../../../types/index.ts"

import AudioObject from "../index.tsx"

// Audiobook adds no properties to the ListItem schema type
export type Props = AudiobookProps & BaseProps

export default function Audiobook({
	_type = "Audiobook",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
