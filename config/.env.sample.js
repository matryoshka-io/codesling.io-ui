const envBuild = {
  development: {
    server: ["PORT=1337"],
    client: [
      "NODE_ENV=development",
      "DEBUG=TRUE",
      "ENVPREFIX=REACT_APP_",
      "REST_SERVER_URL=http://localhost:3396",
      "SOCKET_SERVER_URL=http://localhost:4155",
      "CODERUNNER_SERVICE_URL=http://localhost:4000",
      "REACT_APP_SOCKET_SERVER_URL=http://localhost:4155",
      "REACT_APP_REST_SERVER_URL=http://localhost:3396"
    ]
  },
  production: {
    server: ["PORT=1337"],
    client: [
      "NODE_ENV=production",
      "DEBUG=FALSE",
      "ENVPREFIX=REACT_APP_",
      "REST_SERVER_URL=https://codesling.fun/rest",
      "SOCKET_SERVER_URL=https://codesling.fun/sockets",
      "CODERUNNER_SERVICE_URL=https://codesling.fun/coderunner",
      "REACT_APP_SOCKET_SERVER_URL=https://codesling.fun/sockets",
      "REACT_APP_REST_SERVER_URL=https://codesling.fun/rest"
    ]
  }
};

module.exports = envBuild;
