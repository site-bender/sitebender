import type BaseProps from "../../../../../../types/index.ts"
import type { ImagingTest as ImagingTestProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ImagingTestProps & BaseProps

export default function ImagingTest({
	_type = "ImagingTest",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
