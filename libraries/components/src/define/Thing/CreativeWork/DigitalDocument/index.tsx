import type BaseProps from "../../../../../types/index.ts"
import type { DigitalDocument as DigitalDocumentProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = DigitalDocumentProps & BaseProps

export default function DigitalDocument({
	_type = "DigitalDocument",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
