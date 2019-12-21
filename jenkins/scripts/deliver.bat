echo off
echo 'The following "npm" command builds your Web application for'
echo 'production in the local "build" directory (i.e. within the'
echo '"/var/jenkins_home/workspace/simple-node-js-react-app" directory),'
echo 'correctly bundles APP in production mode and optimizes the build for'
echo 'the best performance.'
call npm run build:inner
if errorlevel 0 (
  if exist E:\JenKins\web-server\vue-cli\dist (
    rd /s/q E:\JenKins\web-server\vue-cli\dist
  )
xcopy dist E:\JenKins\web-server\vue-cli\dist\ /e /y
echo 'serve start success ++++++++'
) else (
echo 'serve start failed --------'
)
echo 'serve run finished'
echo 'The following "npm" command runs your Node.js/Vue application in'