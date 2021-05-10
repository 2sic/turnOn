import { TurnOnConfigurationRaw } from '.';
import { stabilizeConfiguration, TurnOnConfigurationStable } from '../configuration/configuration';

export function loadConfigurationFromString(attr: string): TurnOnConfigurationStable | string {
  let pretyped: TurnOnConfigurationRaw;
  try {
    pretyped = JSON.parse(attr);
  }
  catch (ex) {
    return `detected configuration but cannot parse to json.`;
  }
  let configuration: TurnOnConfigurationStable;
  try {
    configuration = stabilizeConfiguration(pretyped);
  }
  catch (ex) { configuration = null; }

  if(configuration == null) return `loaded configuration but couldn't make sense of it.`;
  return configuration;
}