export const toCamelCase = (str = '') => str.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())

// Convert camelCase to kebab-case
export const toKebab = (str = '') => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
