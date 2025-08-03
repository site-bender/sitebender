import type BaseProps from "../../../../types/index.ts"
import type { PublicationVolume as PublicationVolumeProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = PublicationVolumeProps & BaseProps

export default function PublicationVolume({
	_type = "PublicationVolume",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
