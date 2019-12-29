/* eslint-disable prettier/prettier */

export interface BmcCredentials {
  email: string;
  password: string;
  host: string;
  port: number;
  secureConnection: boolean;
  proxy: string;
}

export interface BmcMailSettings {
  subject: string;
  from: string;
  to: string;
  theme: string;
  attachments?: Array<BmcAttachment>;
}

export interface BmcAttachment {
  filename: string;
  path: string;
}

export interface BmcConfigurations {
  mailInterval?: string;
  verbose?: boolean;
}

export interface BmcNonUserData {
  sentTo: Array<string>;
}

export default interface BmcConfigurationFile {
  credentials: BmcCredentials;
  mail: BmcMailSettings;
  configuration: BmcConfigurations;
  nonUserData: BmcNonUserData;
  jsonConfPath: string;
}
