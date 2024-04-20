export const GENDER = ['MALE', 'FEMALE', 'RATHER_NOT_TO_SAY'] as const;

export function isNumber(value) {
  return Number.isFinite(value) && !isNaN(value);
}
