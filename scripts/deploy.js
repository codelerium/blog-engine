const FtpDeploy = require('ftp-deploy');
const path = require('path');
const ftpDeploy = new FtpDeploy();

const config = {
  username: process.env.FTP_USER_NAME,
  password: process.env.FTP_PASS,
  host: process.env.FTP_HOST,
  port: 21,
  include: ['*'],
}

const apiConfig = {
  ...config,
  localRoot: path.resolve(__dirname, '../api/dist'),
  remoteRoot: "/home/jungd/codelirium/api/dist",
}

const appConfig = {
  ...config,
  localRoot: path.resolve(__dirname, '../frontend/build'),
  remoteRoot: "/home/jungd/codelirium/frontend/build",
}
    
ftpDeploy.deploy(apiConfig, (err) => {
  console.log(err || 'API bundle uploaded');
});
    
ftpDeploy.deploy(appConfig, (err) => {
  console.log(err || 'APP bundle uploaded');
});
