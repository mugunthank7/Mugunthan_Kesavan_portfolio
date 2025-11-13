import React, { createContext, useContext, useState } from 'react';

/**
 * Tabs component inspired by shadcn/ui. Provides a simple API
 * consisting of Tabs, TabsList, TabsTrigger and TabsContent.
 * Internally uses React Context to share the current tab state. The
 * default tab is controlled via the `defaultValue` prop.
 */

// Context to hold current tab value and a setter
const TabsContext = createContext({ value: '', setValue: () => {} });

export function Tabs({ defaultValue = '', className = '', children }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = '', children, ...props }) {
  const { value: activeValue, setValue } = useContext(TabsContext);
  const isActive = activeValue === value;
  return (
    <button
      type="button"
      className={`${className}`}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = '', children, ...props }) {
  const { value: activeValue } = useContext(TabsContext);
  if (activeValue !== value) return null;
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default Tabs;