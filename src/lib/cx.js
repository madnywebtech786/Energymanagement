// Joins class names, skipping anything falsy. Replaces clsx for this project.
export const cx = (...parts) => parts.filter(Boolean).join(" ");
