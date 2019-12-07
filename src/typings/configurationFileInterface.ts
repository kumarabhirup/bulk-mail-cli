/* eslint-disable prettier/prettier */

export interface BmcCredentials {
  service: 'gmail' | 'custom';
  email: string;
  password: string;
  host: string;
  port: number;
  secureConnection: boolean;
}

export interface BmcMailSettings {
  subject: string;
  from: string;
  to: string;
  theme: string;
  attachments: Array<string>;
}

export interface BmcConfigurations {
  mailInterval: number;
}

export interface BmcNonUserData {
  sentTo: Array<string>;
  leftToSend: Array<string>;
}

export default interface BmcConfigurationFile {
  credentials: BmcCredentials;
  mail: BmcMailSettings;
  configuration: BmcConfigurations;
  nonUserData: BmcNonUserData;
}
