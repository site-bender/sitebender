import type BaseProps from "../../../../../../types/index.ts"
import type { DataDownload as DataDownloadProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DataDownloadProps & BaseProps

export default function DataDownload({
	_type = "DataDownload",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
