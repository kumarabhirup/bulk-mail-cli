import checkConnection from './cli/utils/checkConnection'
import doesFileExist from './cli/utils/doesFileExist'
import isFileType from './cli/utils/isFileType'
import isForLoop from './cli/utils/isForLoop'
import stringProcessor from './cli/utils/stringProcessor'
import createTransport from './cli/utils/createTransport'
import checkJsonConfiguration from './cli/commands/file/checkJsonConfiguration'

import BmcConfigurationFile, {
  BmcAttachment,
  BmcConfigurations,
  BmcMailSettings,
  BmcNonUserData,
  BmcCredentials,
} from './typings/configurationFileInterface'

export {
  checkConnection,
  doesFileExist,
  isFileType,
  isForLoop,
  stringProcessor,
  BmcConfigurationFile,
  BmcAttachment,
  BmcConfigurations,
  BmcMailSettings,
  BmcNonUserData,
  BmcCredentials,
  createTransport,
  checkJsonConfiguration,
}
