import type BaseProps from "../../../../../../types/index.ts"
import type { NoteDigitalDocument as NoteDigitalDocumentProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = NoteDigitalDocumentProps & BaseProps

export default function NoteDigitalDocument({
	_type = "NoteDigitalDocument",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
