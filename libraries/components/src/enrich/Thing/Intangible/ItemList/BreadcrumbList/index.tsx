import type BaseProps from "../../../../../types/index.ts"
import type { BreadcrumbList as BreadcrumbListProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BreadcrumbListProps & BaseProps

export default function BreadcrumbList({
	_type = "BreadcrumbList",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
