import type { Date, Number, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CarUsageType from "../../Intangible/Enumeration/CarUsageType/index.ts"
import type DriveWheelConfigurationValue from "../../Intangible/Enumeration/QualitativeValue/DriveWheelConfigurationValue/index.ts"
import type QualitativeValue from "../../Intangible/Enumeration/QualitativeValue/index.ts"
import type SteeringPositionValue from "../../Intangible/Enumeration/QualitativeValue/SteeringPositionValue/index.ts"
import type EngineSpecification from "../../Intangible/StructuredValue/EngineSpecification/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { ProductProps } from "../index.ts"

export interface VehicleProps {
	/** The time needed to accelerate the vehicle from a given start velocity to a given target velocity.\n\nTypical unit code(s): SEC for seconds\n\n* Note: There are unfortunately no standard unit codes for seconds/0..100 km/h or seconds/0..60 mph. Simply use "SEC" for seconds and indicate the velocities in the [[name]] of the [[QuantitativeValue]], or use [[valueReference]] with a [[QuantitativeValue]] of 0..60 mph or 0..100 km/h to specify the reference speeds. */
	accelerationTime?: QuantitativeValue
	/** Indicates the design and body style of the vehicle (e.g. station wagon, hatchback, etc.). */
	bodyType?: QualitativeValue | Text | URL
	/** A [callsign](https://en.wikipedia.org/wiki/Call_sign), as used in broadcasting and radio communications to identify people, radio and TV stations, or vehicles. */
	callSign?: Text
	/** The available volume for cargo or luggage. For automobiles, this is usually the trunk volume.\n\nTypical unit code(s): LTR for liters, FTQ for cubic foot/feet\n\nNote: You can use [[minValue]] and [[maxValue]] to indicate ranges. */
	cargoVolume?: QuantitativeValue
	/** The date of the first registration of the vehicle with the respective public authorities. */
	dateVehicleFirstRegistered?: Date
	/** The drive wheel configuration, i.e. which roadwheels will receive torque from the vehicle's engine via the drivetrain. */
	driveWheelConfiguration?: DriveWheelConfigurationValue | Text
	/** The CO2 emissions in g/km. When used in combination with a QuantitativeValue, put "g/km" into the unitText property of that value, since there is no UN/CEFACT Common Code for "g/km". */
	emissionsCO2?: Number
	/** The capacity of the fuel tank or in the case of electric cars, the battery. If there are multiple components for storage, this should indicate the total of all storage of the same type.\n\nTypical unit code(s): LTR for liters, GLL of US gallons, GLI for UK / imperial gallons, AMH for ampere-hours (for electrical vehicles). */
	fuelCapacity?: QuantitativeValue
	/** The amount of fuel consumed for traveling a particular distance or temporal duration with the given vehicle (e.g. liters per 100 km).\n\n* Note 1: There are unfortunately no standard unit codes for liters per 100 km.  Use [[unitText]] to indicate the unit of measurement, e.g. L/100 km.\n* Note 2: There are two ways of indicating the fuel consumption, [[fuelConsumption]] (e.g. 8 liters per 100 km) and [[fuelEfficiency]] (e.g. 30 miles per gallon). They are reciprocal.\n* Note 3: Often, the absolute value is useful only when related to driving speed ("at 80 km/h") or usage pattern ("city traffic"). You can use [[valueReference]] to link the value for the fuel consumption to another value. */
	fuelConsumption?: QuantitativeValue
	/** The distance traveled per unit of fuel used; most commonly miles per gallon (mpg) or kilometers per liter (km/L).\n\n* Note 1: There are unfortunately no standard unit codes for miles per gallon or kilometers per liter. Use [[unitText]] to indicate the unit of measurement, e.g. mpg or km/L.\n* Note 2: There are two ways of indicating the fuel consumption, [[fuelConsumption]] (e.g. 8 liters per 100 km) and [[fuelEfficiency]] (e.g. 30 miles per gallon). They are reciprocal.\n* Note 3: Often, the absolute value is useful only when related to driving speed ("at 80 km/h") or usage pattern ("city traffic"). You can use [[valueReference]] to link the value for the fuel economy to another value. */
	fuelEfficiency?: QuantitativeValue
	/** The type of fuel suitable for the engine or engines of the vehicle. If the vehicle has only one engine, this property can be attached directly to the vehicle. */
	fuelType?: QualitativeValue | URL | Text
	/** A textual description of known damages, both repaired and unrepaired. */
	knownVehicleDamages?: Text
	/** Indicates that the vehicle meets the respective emission standard. */
	meetsEmissionStandard?: QualitativeValue | Text | URL
	/** The total distance travelled by the particular vehicle since its initial production, as read from its odometer.\n\nTypical unit code(s): KMT for kilometers, SMI for statute miles. */
	mileageFromOdometer?: QuantitativeValue
	/** The release date of a vehicle model (often used to differentiate versions of the same make and model). */
	modelDate?: Date
	/** The number or type of airbags in the vehicle. */
	numberOfAirbags?: Text | Number
	/** The number of axles.\n\nTypical unit code(s): C62. */
	numberOfAxles?: QuantitativeValue | Number
	/** The number of doors.\n\nTypical unit code(s): C62. */
	numberOfDoors?: QuantitativeValue | Number
	/** The total number of forward gears available for the transmission system of the vehicle.\n\nTypical unit code(s): C62. */
	numberOfForwardGears?: QuantitativeValue | Number
	/** The number of owners of the vehicle, including the current one.\n\nTypical unit code(s): C62. */
	numberOfPreviousOwners?: QuantitativeValue | Number
	/** The permitted weight of passengers and cargo, EXCLUDING the weight of the empty vehicle.\n\nTypical unit code(s): KGM for kilogram, LBR for pound\n\n* Note 1: Many databases specify the permitted TOTAL weight instead, which is the sum of [[weight]] and [[payload]]\n* Note 2: You can indicate additional information in the [[name]] of the [[QuantitativeValue]] node.\n* Note 3: You may also link to a [[QualitativeValue]] node that provides additional information using [[valueReference]].\n* Note 4: Note that you can use [[minValue]] and [[maxValue]] to indicate ranges. */
	payload?: QuantitativeValue
	/** The date of production of the item, e.g. vehicle. */
	productionDate?: Date
	/** The date the item, e.g. vehicle, was purchased by the current owner. */
	purchaseDate?: Date
	/** The number of persons that can be seated (e.g. in a vehicle), both in terms of the physical space available, and in terms of limitations set by law.\n\nTypical unit code(s): C62 for persons. */
	seatingCapacity?: QuantitativeValue | Number
	/** The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by [[maxValue]]) should be the maximum speed achievable under regular conditions.\n\nTypical unit code(s): KMH for km/h, HM for mile per hour (0.447 04 m/s), KNT for knot\n\n*Note 1: Use [[minValue]] and [[maxValue]] to indicate the range. Typically, the minimal value is zero.\n* Note 2: There are many different ways of measuring the speed range. You can link to information about how the given value has been determined using the [[valueReference]] property. */
	speed?: QuantitativeValue
	/** The position of the steering wheel or similar device (mostly for cars). */
	steeringPosition?: SteeringPositionValue
	/** The permitted vertical load (TWR) of a trailer attached to the vehicle. Also referred to as Tongue Load Rating (TLR) or Vertical Load Rating (VLR).\n\nTypical unit code(s): KGM for kilogram, LBR for pound\n\n* Note 1: You can indicate additional information in the [[name]] of the [[QuantitativeValue]] node.\n* Note 2: You may also link to a [[QualitativeValue]] node that provides additional information using [[valueReference]].\n* Note 3: Note that you can use [[minValue]] and [[maxValue]] to indicate ranges. */
	tongueWeight?: QuantitativeValue
	/** The permitted weight of a trailer attached to the vehicle.\n\nTypical unit code(s): KGM for kilogram, LBR for pound\n* Note 1: You can indicate additional information in the [[name]] of the [[QuantitativeValue]] node.\n* Note 2: You may also link to a [[QualitativeValue]] node that provides additional information using [[valueReference]].\n* Note 3: Note that you can use [[minValue]] and [[maxValue]] to indicate ranges. */
	trailerWeight?: QuantitativeValue
	/** A short text indicating the configuration of the vehicle, e.g. '5dr hatchback ST 2.5 MT 225 hp' or 'limited edition'. */
	vehicleConfiguration?: Text
	/** Information about the engine or engines of the vehicle. */
	vehicleEngine?: EngineSpecification
	/** The Vehicle Identification Number (VIN) is a unique serial number used by the automotive industry to identify individual motor vehicles. */
	vehicleIdentificationNumber?: Text
	/** The color or color combination of the interior of the vehicle. */
	vehicleInteriorColor?: Text
	/** The type or material of the interior of the vehicle (e.g. synthetic fabric, leather, wood, etc.). While most interior types are characterized by the material used, an interior type can also be based on vehicle usage or target audience. */
	vehicleInteriorType?: Text
	/** The release date of a vehicle model (often used to differentiate versions of the same make and model). */
	vehicleModelDate?: Date
	/** The number of passengers that can be seated in the vehicle, both in terms of the physical space available, and in terms of limitations set by law.\n\nTypical unit code(s): C62 for persons. */
	vehicleSeatingCapacity?: Number | QuantitativeValue
	/** Indicates whether the vehicle has been used for special purposes, like commercial rental, driving school, or as a taxi. The legislation in many countries requires this information to be revealed when offering a car for sale. */
	vehicleSpecialUsage?: Text | CarUsageType
	/** The type of component used for transmitting the power from a rotating power source to the wheels or other relevant component(s) ("gearbox" for cars). */
	vehicleTransmission?: QualitativeValue | Text | URL
	/** The permitted total weight of the loaded vehicle, including passengers and cargo and the weight of the empty vehicle.\n\nTypical unit code(s): KGM for kilogram, LBR for pound\n\n* Note 1: You can indicate additional information in the [[name]] of the [[QuantitativeValue]] node.\n* Note 2: You may also link to a [[QualitativeValue]] node that provides additional information using [[valueReference]].\n* Note 3: Note that you can use [[minValue]] and [[maxValue]] to indicate ranges. */
	weightTotal?: QuantitativeValue
	/** The distance between the centers of the front and rear wheels.\n\nTypical unit code(s): CMT for centimeters, MTR for meters, INH for inches, FOT for foot/feet. */
	wheelbase?: QuantitativeValue
}

type Vehicle =
	& Thing
	& ProductProps
	& VehicleProps

export default Vehicle
