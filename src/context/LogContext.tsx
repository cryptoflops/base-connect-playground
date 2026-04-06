'use client';

import React, { createContext, useContext, useReducer, Dispatch, ReactNode } from 'react';

export type LogType = 'info' | 'success' | 'error' | 'tx';

export interface LogEntry {
  id: string;
  type: LogType;
  title: string;
  message?: string;
  payload?: any;
  txHash?: string;
  timestamp: number;
}

export type LogAction = 
  | { type: 'ADD_LOG'; payload: Omit<LogEntry, 'id' | 'timestamp'> }
  | { type: 'CLEAR_LOGS' };

const LogDataContext = createContext<LogEntry[]>([]);
const LogDispatchContext = createContext<Dispatch<LogAction>>(() => {});

function logReducer(state: LogEntry[], action: LogAction): LogEntry[] {
  switch (action.type) {
    case 'ADD_LOG':
      return [
        {
          ...action.payload,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
        },
        ...state,
      ];
    case 'CLEAR_LOGS':
      return [];
    default:
      return state;
  }
}

export function LogProvider({ children }: { children: ReactNode }) {
  const [logs, dispatch] = useReducer(logReducer, []);
  return (
    <LogDispatchContext.Provider value={dispatch}>
      <LogDataContext.Provider value={logs}>
        {children}
      </LogDataContext.Provider>
    </LogDispatchContext.Provider>
  );
}

export const useLogDispatch = () => useContext(LogDispatchContext);
export const useLogs = () => useContext(LogDataContext);
