import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  isSidebarExpanded: boolean;
  showBalances: boolean;
  enableNotification: boolean;
  activeTab: string;
  toggleSidebar: () => void;
  toggleBalances: () => void;
  toggleNotification: () => void;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isSidebarExpanded: false,
  showBalances: false,
  enableNotification: true,
  activeTab: 'home',
  setIsLoggedIn: () => { },
  setIsLoading: () => { },
  setIsError: () => { },
  toggleSidebar: () => { },
  toggleBalances: () => { },
  toggleNotification: () => { },
  setActiveTab: () => { },
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showBalances, setShowBalances] = useState(false);
  const [enableNotification, setEnableNotification] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  const toggleBalances = () => {
    setShowBalances(prev => !prev);
  };

  const toggleNotification = () => {
    setEnableNotification(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isSidebarExpanded,
        toggleSidebar,
        showBalances,
        enableNotification,
        toggleBalances,
        toggleNotification,
        activeTab,
        setActiveTab,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
