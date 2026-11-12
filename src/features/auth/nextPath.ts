const DEFAULT_PATH = '/';

export const safeNextPath = (value: string | null) =>
  value && value.startsWith('/') && !value.startsWith('//')
    ? value
    : DEFAULT_PATH;
