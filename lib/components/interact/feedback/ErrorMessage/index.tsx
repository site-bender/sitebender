/**
 * ErrorMessage component
 *
 * Renders error messages with proper ARIA attributes for form
 * validation and error states. Automatically includes role="alert"
 * and associates with form fields via aria-describedby.
 *
 * Example usage:
 *
 * <input
 *   type="email"
 *   aria-invalid="true"
 *   aria-describedby="email-error"
 * />
 * <ErrorMessage id="email-error">
 *   Please enter a valid email address
 * </ErrorMessage>
 */
