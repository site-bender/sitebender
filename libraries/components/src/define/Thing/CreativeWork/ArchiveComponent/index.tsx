import type BaseProps from "../../../../types/index.ts"
import type { ArchiveComponent as ArchiveComponentProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ArchiveComponentProps & BaseProps

export default function ArchiveComponent({
	_type = "ArchiveComponent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
