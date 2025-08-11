import type BaseProps from "../../../../../types/index.ts"
import type { TextDigitalDocument as TextDigitalDocumentProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TextDigitalDocumentProps & BaseProps

export default function TextDigitalDocument({
	_type = "TextDigitalDocument",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
