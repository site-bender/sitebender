import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CategoryCode from "../../Intangible/DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../../Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import type Observation from "../../Intangible/Observation/index.ts"
import type GovernmentService from "../../Intangible/Service/GovernmentService/index.ts"
import type LocalBusiness from "../../Organization/LocalBusiness/index.ts"
import type CivicStructure from "../../Place/CivicStructure/index.ts"
import type DataFeed from "../Dataset/DataFeed/index.ts"
import type Dataset from "../Dataset/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type WebContent from "../WebContent/index.ts"

import DataFeedComponent from "../../../../components/Thing/CreativeWork/Dataset/DataFeed/index.ts"
import DatasetComponent from "../../../../components/Thing/CreativeWork/Dataset/index.ts"
import WebContentComponent from "../../../../components/Thing/CreativeWork/WebContent/index.ts"
import ThingComponent from "../../../../components/Thing/index.ts"
import CategoryCodeComponent from "../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"
import PhysicalActivityCategoryComponent from "../../../../components/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import ObservationComponent from "../../../../components/Thing/Intangible/Observation/index.ts"
import GovernmentServiceComponent from "../../../../components/Thing/Intangible/Service/GovernmentService/index.ts"
import LocalBusinessComponent from "../../../../components/Thing/Organization/LocalBusiness/index.ts"
import CivicStructureComponent from "../../../../components/Thing/Place/CivicStructure/index.ts"

export interface SpecialAnnouncementProps {
	announcementLocation?:
		| CivicStructure
		| LocalBusiness
		| ReturnType<typeof CivicStructureComponent>
		| ReturnType<typeof LocalBusinessComponent>
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
	datePosted?: Date | DateTime
	diseasePreventionInfo?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	diseaseSpreadStatistics?:
		| Dataset
		| Observation
		| URL
		| WebContent
		| ReturnType<typeof DatasetComponent>
		| ReturnType<typeof ObservationComponent>
		| ReturnType<typeof WebContentComponent>
	gettingTestedInfo?: URL | WebContent | ReturnType<typeof WebContentComponent>
	governmentBenefitsInfo?:
		| GovernmentService
		| ReturnType<typeof GovernmentServiceComponent>
	newsUpdatesAndGuidelines?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	publicTransportClosuresInfo?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	quarantineGuidelines?:
		| URL
		| WebContent
		| ReturnType<typeof WebContentComponent>
	schoolClosuresInfo?: URL | WebContent | ReturnType<typeof WebContentComponent>
	travelBans?: URL | WebContent | ReturnType<typeof WebContentComponent>
	webFeed?: DataFeed | URL | ReturnType<typeof DataFeedComponent>
}

type SpecialAnnouncement = Thing & CreativeWorkProps & SpecialAnnouncementProps

export default SpecialAnnouncement
