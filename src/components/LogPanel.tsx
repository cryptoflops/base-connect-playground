'use client';

import { useState } from 'react';
import { useLogs, useLogDispatch, LogEntry } from '@/context/LogContext';
import { useAppKitNetwork } from '@reown/appkit/react';
import { networks } from '@/config';

export function LogPanel() {
  const logs = useLogs();
  const dispatch = useLogDispatch();
  const [filter, setFilter] = useState<'all' | 'tx' | 'error'>('all');
  const { caipNetwork } = useAppKitNetwork();
  const activeNetworkId = caipNetwork?.id ? Number(String(caipNetwork.id).split(':').pop()) : undefined;

  const logsForChain = logs.filter(log => !log.chainId || log.chainId === activeNetworkId);
  const filteredLogs = logsForChain.filter(log => filter === 'all' || log.type === filter);

  return (
    <>
      <div className="p-6 border-b border-outline-variant/10 bg-surface-container-low">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Network Terminal</h3>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full accent-bg animate-pulse"></span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Live Feed</span>
          </span>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-[#050505] p-2 rounded border border-outline-variant/10">
            <div className="text-[9px] text-on-surface-variant uppercase tracking-tighter">Event Count</div>
            <div className="text-sm font-mono text-white">{logsForChain.length}</div>
          </div>
          <div className="flex-1 bg-[#050505] p-2 rounded border border-outline-variant/10">
            <div className="text-[9px] text-on-surface-variant uppercase tracking-tighter">Network</div>
            <div className="text-sm font-mono accent-text">Live</div>
          </div>
        </div>
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

      <div className="flex-1 overflow-y-auto custom-terminal-scrollbar p-4 space-y-3 font-mono text-[11px] leading-relaxed">
        {logsForChain.length === 0 ? (
          <div className="flex h-full items-center justify-center text-on-surface-variant font-sans text-center">
            <p>No events recorded yet on this network.</p>
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
          className="w-full bg-surface-container-high text-xs font-bold py-3 rounded-lg transition-all hover-accent-bg"
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

  const net = networks.find(n => n.id === log.chainId) || networks[0];
  const explorerUrl = net?.blockExplorers?.default?.url || 'https://basescan.org';

  return (
    <div className={`p-3 rounded-lg ${getBadgeColor()}`}>
      <div className="flex justify-between mb-1">
        <span className={`${getLabelColor()} font-bold uppercase truncate pr-2`}>{log.title || log.type}</span>
        <span className="text-[10px] text-on-surface-variant whitespace-nowrap">{time}</span>
      </div>
      <p className="text-on-surface-variant break-words">{log.message}</p>
      
      {log.txHash && (
        <a
          href={`${explorerUrl}/tx/${log.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="accent-text mt-1 block truncate hover:underline"
        >
          {log.txHash}
        </a>
      )}
    </div>
  );
}
