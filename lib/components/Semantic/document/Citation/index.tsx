/**
 * Citation component
 *
 * Renders a bibliographic citation in various academic styles.
 * Automatically formats based on the style prop and the provided
 * metadata. Uses cite element with data attributes for styling.
 *
 * Example usage:
 *
 * <Citation
 *   style="mla"
 *   author="Woolf, Virginia"
 *   title="A Room of One's Own"
 *   publisher="Hogarth Press"
 *   year="1929"
 *   medium="Print"
 * />
 *
 * <Citation
 *   style="apa"
 *   authors={["Smith, J.", "Doe, A."]}
 *   year="2023"
 *   title="Effects of climate change on biodiversity"
 *   journal="Nature"
 *   volume="589"
 *   pages="123-145"
 *   doi="10.1038/nature12345"
 * />
 */