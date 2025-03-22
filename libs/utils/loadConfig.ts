import settings from "../../local.settings.json";

export function loadConfig<T>(name: string, defaultValue: T): T {
  const value = settings?.Values?.[name];
  return value !== undefined ? (value as T) : defaultValue;
}
