import { createContext } from 'react';
import React, { useState } from 'react';

const DemoModeContext = createContext<IDemoModeContext>({} as IDemoModeContext);

interface IDemoModeContext {
  demoModeActive: boolean;
  setDemoModeActive: (value: boolean) => void;
}

/**
 * Context for a demo mode, where user location is overwritten with a preset values
 */
export const DemoModeProvider = ({ children }: any) => {
  const [demoModeActive, setDemoModeActive] = useState(true);

  return (
    <DemoModeContext.Provider value={{ demoModeActive, setDemoModeActive }}>
      {children}
    </DemoModeContext.Provider>
  );
};

export default DemoModeContext;
