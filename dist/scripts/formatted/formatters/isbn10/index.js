// Helper function to format ISBN-10
export default function isbn10 (digits){
  const parts = [];
  if (digits.length > 0) {
    parts.push(digits.slice(0, 1));
  }
  if (digits.length > 1) {
    parts.push(digits.slice(1, 6));
  }
  if (digits.length > 6) {
    parts.push(digits.slice(6, 9));
  }
  if (digits.length > 9) {
    parts.push(digits.slice(9));
  }
  return parts.join('-');
};
