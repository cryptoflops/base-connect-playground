'use client';

import { useState } from 'react';
import { useLogs, useLogDispatch, LogEntry } from '@/context/LogContext';

export function LogPanel() {
  const logs = useLogs();
  const dispatch = useLogDispatch();
  const [filter, setFilter] = useState<'all' | 'tx' | 'error'>('all');

  const filteredLogs = logs.filter(log => filter === 'all' || log.type === filter);

  return (
    <div className="flex h-full flex-col border border-border bg-background rounded-xl overflow-hidden shadow-sm">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded transition-colors ${filter === 'all' ? 'bg-primary/20 text-primary' : 'text-foreground/40 hover:bg-muted'}`}
          >
            All Logs
          </button>
          <button
            onClick={() => setFilter('tx')}
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded transition-colors ${filter === 'tx' ? 'bg-primary/20 text-primary' : 'text-foreground/40 hover:bg-muted'}`}
          >
            Transactions
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded transition-colors ${filter === 'error' ? 'bg-danger/20 text-danger' : 'text-foreground/40 hover:bg-muted'}`}
          >
            Errors
          </button>
        </div>
        <button
          onClick={() => dispatch({ type: 'CLEAR_LOGS' })}
          className="text-[10px] uppercase tracking-wider font-semibold text-foreground/40 hover:text-foreground transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Log List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm min-h-[400px] max-h-[80vh] bg-background">
        {logs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-foreground/30 text-sm font-sans">
            <p>No events recorded yet. Connect a wallet and trigger an action.</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-foreground/30 text-sm font-sans">
            <p>No logs match the current filter.</p>
          </div>
        ) : (
          filteredLogs.map(log => (
            <LogCard key={log.id} log={log} />
          ))
        )}
      </div>
    </div>
  );
}

function LogCard({ log }: { log: LogEntry }) {
  const time = new Date(log.timestamp).toLocaleTimeString();
  
  const getBadgeColor = () => {
    switch (log.type) {
      case 'success': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'error': return 'bg-danger/10 text-danger border-danger/20';
      case 'tx': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-foreground/60 border-border';
    }
  };

  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/10 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-1.5 py-0.5 text-[9px] uppercase tracking-wider rounded border ${getBadgeColor()}`}>
            {log.type}
          </span>
          <strong className="text-xs font-medium text-foreground/90 font-sans">{log.title}</strong>
        </div>
        <span className="text-[10px] text-foreground/40">{time}</span>
      </div>
      
      {log.message && (
        <p className="text-xs text-foreground/70 mt-1">{log.message}</p>
      )}

      {log.txHash && (
        <a
          href={`https://sepolia.basescan.org/tx/${log.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary flex items-center gap-1 hover:text-primary-hover hover:underline transition-colors truncate mt-1"
        >
          <span className="text-foreground/40">TxHash:</span> {log.txHash}
        </a>
      )}

      {log.payload && (
        <div className="mt-2 rounded bg-background p-2 overflow-x-auto border border-border/50">
          <pre className="text-[11px] text-foreground/80 leading-relaxed block">
            {JSON.stringify(log.payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
