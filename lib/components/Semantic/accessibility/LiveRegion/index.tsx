/**
 * LiveRegion component
 *
 * Renders a live region that announces dynamic content changes to
 * screen readers. Supports different politeness levels (polite,
 * assertive) and relevance settings. Essential for notifications,
 * status updates, and dynamic content.
 *
 * Example usage:
 *
 * <LiveRegion aria-live="polite">
 *   3 items added to cart
 * </LiveRegion>
 *
 * <LiveRegion aria-live="assertive" aria-relevant="additions">
 *   Error: Invalid email address
 * </LiveRegion>
 */