import type BaseProps from "../../../../types/index.ts"
import type { SpecialAnnouncement as SpecialAnnouncementProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SpecialAnnouncementProps & BaseProps

export default function SpecialAnnouncement({
	_type = "SpecialAnnouncement",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
