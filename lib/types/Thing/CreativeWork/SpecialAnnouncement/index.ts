import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CategoryCode from "../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type CivicStructure from "../../Place/CivicStructure/index.ts"
import type DataFeed from "../Dataset/DataFeed/index.ts"
import type Dataset from "../Dataset/index.ts"
import type GovernmentService from "../../Intangible/Service/GovernmentService/index.ts"
import type LocalBusiness from "../../Organization/LocalBusiness/index.ts"
import type Observation from "../../Intangible/Observation/index.ts"
import type PhysicalActivityCategory from "../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type WebContent from "../WebContent/index.ts"

export interface SpecialAnnouncementProps {
	announcementLocation?: CivicStructure | LocalBusiness
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
	datePosted?: Date | DateTime
	diseasePreventionInfo?: URL | WebContent
	diseaseSpreadStatistics?: Dataset | Observation | URL | WebContent
	gettingTestedInfo?: URL | WebContent
	governmentBenefitsInfo?: GovernmentService
	newsUpdatesAndGuidelines?: URL | WebContent
	publicTransportClosuresInfo?: URL | WebContent
	quarantineGuidelines?: URL | WebContent
	schoolClosuresInfo?: URL | WebContent
	travelBans?: URL | WebContent
	webFeed?: DataFeed | URL
}

type SpecialAnnouncement =
	& Thing
	& CreativeWorkProps
	& SpecialAnnouncementProps

export default SpecialAnnouncement
