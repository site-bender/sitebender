import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"
import type { AirportType } from "./Airport/index.ts"
import type { AquariumType } from "./Aquarium/index.ts"
import type { BeachType } from "./Beach/index.ts"
import type { BoatTerminalType } from "./BoatTerminal/index.ts"
import type { BridgeType } from "./Bridge/index.ts"
import type { BusStationType } from "./BusStation/index.ts"
import type { BusStopType } from "./BusStop/index.ts"
import type { CampgroundType } from "./Campground/index.ts"
import type { CemeteryType } from "./Cemetery/index.ts"
import type { CrematoriumType } from "./Crematorium/index.ts"
import type { EducationalOrganizationType } from "./EducationalOrganization/index.ts"
import type { EventVenueType } from "./EventVenue/index.ts"
import type { FireStationType } from "./FireStation/index.ts"
import type { GovernmentBuildingType } from "./GovernmentBuilding/index.ts"
import type { HospitalType } from "./Hospital/index.ts"
import type { MovieTheaterType } from "./MovieTheater/index.ts"
import type { MuseumType } from "./Museum/index.ts"
import type { MusicVenueType } from "./MusicVenue/index.ts"
import type { ParkType } from "./Park/index.ts"
import type { ParkingFacilityType } from "./ParkingFacility/index.ts"
import type { PerformingArtsTheaterType } from "./PerformingArtsTheater/index.ts"
import type { PlaceOfWorshipType } from "./PlaceOfWorship/index.ts"
import type { PlaygroundType } from "./Playground/index.ts"
import type { PoliceStationType } from "./PoliceStation/index.ts"
import type { PublicToiletType } from "./PublicToilet/index.ts"
import type { RVParkType } from "./RVPark/index.ts"
import type { StadiumOrArenaType } from "./StadiumOrArena/index.ts"
import type { SubwayStationType } from "./SubwayStation/index.ts"
import type { TaxiStandType } from "./TaxiStand/index.ts"
import type { TrainStationType } from "./TrainStation/index.ts"
import type { ZooType } from "./Zoo/index.ts"

export type CivicStructureType =
	| "CivicStructure"
	| PublicToiletType
	| CrematoriumType
	| CampgroundType
	| PlaygroundType
	| MusicVenueType
	| EventVenueType
	| TaxiStandType
	| BridgeType
	| ParkType
	| RVParkType
	| CemeteryType
	| ParkingFacilityType
	| PoliceStationType
	| SubwayStationType
	| EducationalOrganizationType
	| HospitalType
	| ZooType
	| MovieTheaterType
	| BoatTerminalType
	| AirportType
	| MuseumType
	| GovernmentBuildingType
	| StadiumOrArenaType
	| BeachType
	| BusStationType
	| AquariumType
	| PlaceOfWorshipType
	| BusStopType
	| TrainStationType
	| PerformingArtsTheaterType
	| FireStationType

export interface CivicStructureProps {
	"@type"?: CivicStructureType
	openingHours?: Text
}

type CivicStructure = Thing & PlaceProps & CivicStructureProps

export default CivicStructure
