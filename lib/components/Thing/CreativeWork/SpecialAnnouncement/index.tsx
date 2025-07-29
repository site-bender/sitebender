import type BaseProps from "../../../../types/index.ts"
import type SpecialAnnouncementProps from "../../../../types/Thing/CreativeWork/SpecialAnnouncement/index.ts"

import CreativeWork from "../index.tsx"

export type Props = SpecialAnnouncementProps & BaseProps

export default function SpecialAnnouncement({
	announcementLocation,
	category,
	datePosted,
	diseasePreventionInfo,
	diseaseSpreadStatistics,
	gettingTestedInfo,
	governmentBenefitsInfo,
	newsUpdatesAndGuidelines,
	publicTransportClosuresInfo,
	quarantineGuidelines,
	schoolClosuresInfo,
	travelBans,
	webFeed,
	_type = "SpecialAnnouncement",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				announcementLocation,
				category,
				datePosted,
				diseasePreventionInfo,
				diseaseSpreadStatistics,
				gettingTestedInfo,
				governmentBenefitsInfo,
				newsUpdatesAndGuidelines,
				publicTransportClosuresInfo,
				quarantineGuidelines,
				schoolClosuresInfo,
				travelBans,
				webFeed,
				...subtypeProperties,
			}}
		/>
	)
}
