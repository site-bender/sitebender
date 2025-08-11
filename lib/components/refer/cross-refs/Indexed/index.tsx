/**
 * Indexed component
 *
 * Renders an index entry with the term and page references.
 * Supports sub-entries and cross-references. Uses data attributes
 * for enhanced styling and potential automated index generation.
 *
 * Example usage:
 *
 * <Indexed
 *   term="metaphor"
 *   pages="23, 45-47, 89"
 *   see-also="simile, imagery"
 * >
 *   <Indexed term="extended" pages="45-47" subentry />
 *   <Indexed term="mixed" pages="89" subentry />
 * </Indexed>
 */
