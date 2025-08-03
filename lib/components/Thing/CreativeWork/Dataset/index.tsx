import type BaseProps from "../../../../types/index.ts"
import type { Dataset as DatasetProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DatasetProps & BaseProps

export default function Dataset({
	_type = "Dataset",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
