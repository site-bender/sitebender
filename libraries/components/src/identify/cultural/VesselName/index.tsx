/**
 * VesselName component
 *
 * Renders the name of a vessel in an i element. Can include an href to link to a more detailed
 * description or discussion of the vessel. Can use the Vessel component or similar
 * for microdata or Linked Data purposes. Has a type prop to specify the type of vessel
 * and isFictional prop to indicate if the vessel is fictional. And an optional designation
 * prop to specify the designation of the vessel, such as an aircraft number or registry.
 *
 * Example usage:
 *
 * <VesselName
 *   designation="NCC-1701"
 *   isFictional
 *   type="Starship"
 * >
 *   USS Enterprise
 * </VesselName>
 *
 * <VesselName
 *   href="https://en.wikipedia.org/wiki/HMS_Bounty"
 * >
 *   HMS Bounty
 * </VesselName>
 */
