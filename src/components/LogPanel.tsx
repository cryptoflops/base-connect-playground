'use client';

import { useState } from 'react';
import { useLogs, useLogDispatch, LogEntry } from '@/context/LogContext';

export function LogPanel() {
  const logs = useLogs();
  const dispatch = useLogDispatch();
  const [filter, setFilter] = useState<'all' | 'tx' | 'error'>('all');

  const filteredLogs = logs.filter(log => filter === 'all' || log.type === filter);

  return (
    <>
      <div className="p-6 border-b border-outline-variant/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-['Inter'] font-bold text-lg">Activity Log</h2>
          <span className="w-2 h-2 rounded-full accent-bg animate-pulse"></span>
        </div>
        <p className="text-xs text-[#C5C4DB] opacity-60">Live Chain Stream (Base Mainnet)</p>
      </div>

      <div className="flex border-b border-outline-variant/10">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-4 text-xs flex flex-col items-center gap-1 transition-opacity ${filter === 'all' ? 'font-bold text-on-surface border-b-2 accent-border' : 'font-medium text-[#C5C4DB] opacity-60 hover:opacity-100'}`}
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          Logs
        </button>
        <button
          onClick={() => setFilter('tx')}
          className={`flex-1 py-4 text-xs flex flex-col items-center gap-1 transition-opacity ${filter === 'tx' ? 'font-bold text-on-surface border-b-2 accent-border' : 'font-medium text-[#C5C4DB] opacity-60 hover:opacity-100'}`}
        >
          <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
          TXs
        </button>
        <button
          onClick={() => setFilter('error')}
          className={`flex-1 py-4 text-xs flex flex-col items-center gap-1 transition-opacity ${filter === 'error' ? 'font-bold text-on-surface border-b-2 accent-border' : 'font-medium text-[#C5C4DB] opacity-60 hover:opacity-100'}`}
        >
          <span className="material-symbols-outlined text-[18px]">error_outline</span>
          Errors
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 font-mono text-[0.75rem]">
        {logs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-on-surface-variant font-sans text-center">
            <p>No events recorded yet. Connect a wallet and trigger an action.</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-on-surface-variant font-sans text-center">
            <p>No logs match the current filter.</p>
          </div>
        ) : (
          filteredLogs.map(log => (
            <LogCard key={log.id} log={log} />
          ))
        )}
      </div>

      <div className="p-4 border-t border-outline-variant/10">
        <button
          onClick={() => dispatch({ type: 'CLEAR_LOGS' })}
          className="w-full bg-surface-container-high text-xs font-bold py-3 rounded-lg hover:accent-bg hover:accent-on-text transition-all"
        >
          Clear Terminal
        </button>
      </div>
    </>
  );
}

function LogCard({ log }: { log: LogEntry }) {
  const time = new Date(log.timestamp).toLocaleTimeString();
  
  const getBadgeColor = () => {
    switch (log.type) {
      case 'error': return 'bg-error-container/20 border-error border-l-2';
      case 'tx': return 'bg-surface-container accent-border border-l-2';
      default: return 'bg-surface-container opacity-80';
    }
  };
  
  const getLabelColor = () => {
    switch (log.type) {
      case 'error': return 'text-error';
      case 'tx': return 'accent-text';
      default: return 'text-tertiary';
    }
  }

  return (
    <div className={`p-3 rounded-lg ${getBadgeColor()}`}>
      <div className="flex justify-between mb-1">
        <span className={`${getLabelColor()} font-bold uppercase truncate pr-2`}>{log.title || log.type}</span>
        <span className="text-[10px] text-on-surface-variant whitespace-nowrap">{time}</span>
      </div>
      <p className="text-on-surface-variant break-words">{log.message}</p>
      
      {log.txHash && (
        <a
          href={`https://sepolia.basescan.org/tx/${log.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-fixed mt-1 block truncate hover:underline"
        >
          {log.txHash}
        </a>
      )}
    </div>
  );
}
