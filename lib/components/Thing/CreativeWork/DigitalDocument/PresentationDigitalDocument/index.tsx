import type BaseProps from "../../../../../types/index.ts"
import type { PresentationDigitalDocument as PresentationDigitalDocumentProps } from "../../../../../types/index.ts"

import DigitalDocument from "../index.tsx"

export type Props = PresentationDigitalDocumentProps & BaseProps

export default function PresentationDigitalDocument({
	_type = "PresentationDigitalDocument",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
