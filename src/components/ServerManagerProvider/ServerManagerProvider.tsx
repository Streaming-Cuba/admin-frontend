import React from "react";
import ServerManager from "../../apis/axios";

const serverManager = new ServerManager();
const AxiosProviderStateContext = React.createContext(serverManager);

function ServerManagerProvider(props: any) {
  return (
    <AxiosProviderStateContext.Provider value={serverManager}>
      {props.children}
    </AxiosProviderStateContext.Provider>
  );
}

function useServerManager(): ServerManager {
  const context = React.useContext(AxiosProviderStateContext);
  if (context === undefined) {
    throw new Error("useServerManager must be used within a ServerManagerProvider");
  }
  return context;
}

function withServerManager(WrappedComponent: any) {
  return class ServerManager extends React.Component {
    static contextType = AxiosProviderStateContext;

    render() {
      return <WrappedComponent serverManager={this.context} {...this.props} />;
    }
  };
}

export default ServerManagerProvider;

export { ServerManagerProvider, useServerManager, withServerManager };
