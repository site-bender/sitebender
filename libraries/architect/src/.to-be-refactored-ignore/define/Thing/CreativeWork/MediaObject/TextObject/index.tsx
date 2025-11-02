import type BaseProps from "../../../../../../types/index.ts"
import type { TextObject as TextObjectProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TextObjectProps & BaseProps

export default function TextObject({
	_type = "TextObject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
