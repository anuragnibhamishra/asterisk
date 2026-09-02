import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { SolverResult } from '@/components/SolverResult';
import { deleteHistoryEntry, getHistoryEntries, updateHistoryFavorite, type HistoryEntry } from '@/lib/history';
import { getProblemTypeConfig } from '@/utils/problemTypes';
import { IconDots, IconStar, IconStarFilled } from '@tabler/icons-react';

type FilterType = 'all' | 'permutations' | 'combinations' | 'factorials' | 'probability' | 'pascal';
const FILTERS: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' }, { value: 'permutations', label: 'Permutations' },
    { value: 'combinations', label: 'Combinations' }, { value: 'factorials', label: 'Factorials' },
    { value: 'probability', label: 'Probability' }, { value: 'pascal', label: "Pascal's Triangle" },
];

function typeLabel(type: string) {
    if (type === 'pascal-triangle') return "Pascal's Triangle";
    if (type === 'probability') return 'Probability';
    return getProblemTypeConfig(type)?.label ?? type;
}
function matches(type: string, filter: FilterType) {
    if (filter === 'all') return true;
    if (filter === 'permutations') return type.includes('permutation');
    if (filter === 'combinations') return type.includes('combination');
    if (filter === 'factorials') return type === 'factorial';
    return filter === 'pascal' ? type === 'pascal-triangle' : type === 'probability';
}
function groupDate(value: string) {
    const date = new Date(value); const now = new Date();
    const day = (item: Date) => new Date(item.getFullYear(), item.getMonth(), item.getDate()).getTime();
    const difference = Math.round((day(now) - day(date)) / 86400000);
    if (difference === 0) return 'Today';
    if (difference === 1) return 'Yesterday';
    return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
}
function time(value: string) { return new Date(value).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }); }
function inputs(value: Record<string, string>) { return Object.entries(value).map(([key, item]) => `${key} = ${item}`).join(', '); }

export function HistoryPage() {
    const [entries, setEntries] = useState<HistoryEntry[]>([]);
    const [search, setSearch] = useState(''); const [filter, setFilter] = useState<FilterType>('all');
    const [menu, setMenu] = useState<string | null>(null); const [solution, setSolution] = useState<HistoryEntry | null>(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        getHistoryEntries().then((data) => { if (active) setEntries(data); }).catch(() => { if (active) setError('Unable to load history. Apply the Supabase history migration first.'); }).finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    const visible = useMemo(() => {
        const query = search.trim().toLowerCase();
        return entries.filter((entry) => `${entry.expression} ${entry.problemType} ${typeLabel(entry.problemType)}`.toLowerCase().includes(query) && matches(entry.problemType, filter));
    }, [entries, filter, search]);
    const groups = useMemo(() => visible.reduce<Record<string, HistoryEntry[]>>((result, entry) => { const key = groupDate(entry.createdAt); result[key] = [...(result[key] ?? []), entry]; return result; }, {}), [visible]);
    const openSolution = (entry: HistoryEntry) => { setSolution(entry); setMenu(null); };

    const toggleFavorite = async (entry: HistoryEntry) => {
        const next = !entry.isFavorite;
        setEntries((current) => current.map((item) => item.id === entry.id ? { ...item, isFavorite: next } : item));
        try { await updateHistoryFavorite(entry.id, next); } catch { setEntries((current) => current.map((item) => item.id === entry.id ? { ...item, isFavorite: entry.isFavorite } : item)); setError('Unable to update this favorite.'); }
    };
    const remove = async (entry: HistoryEntry) => {
        if (!window.confirm('Delete this calculation from your history?')) return;
        try { await deleteHistoryEntry(entry.id); setEntries((current) => current.filter((item) => item.id !== entry.id)); setMenu(null); } catch { setError('Unable to delete this calculation.'); }
    };

    const card = (entry: HistoryEntry) => (
        <article key={entry.id} className="rounded-xl border border-surface-border bg-surface-raised p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3"><div className="min-w-0"><span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{typeLabel(entry.problemType)}</span><p className="mt-4 break-words font-math text-text">{entry.expression}</p></div>
                <div className="relative flex shrink-0 gap-1"><button type="button" aria-label={entry.isFavorite ? 'Unsave calculation' : 'Save calculation'} aria-pressed={entry.isFavorite} onClick={() => void toggleFavorite(entry)} className="rounded-md px-2 py-1 text-lg text-text-muted hover:bg-surface hover:text-primary">{entry.isFavorite ? <IconStarFilled stroke={1.5} size={16} /> : <IconStar stroke={1.5} size={16} />}</button><button type="button" aria-label="Calculation actions" aria-expanded={menu === entry.id} onClick={() => setMenu(menu === entry.id ? null : entry.id)} className="rounded-md px-2 flex items-center justify-center leading-none py-1 text-lg text-text-muted hover:bg-surface hover:text-text"><IconDots stroke={1.5} size={24} /></button>
                    {menu === entry.id && <div className="absolute right-0 top-full z-10 mt-1 min-w-40 rounded-md border border-surface-border bg-surface p-1 shadow-lg"><button type="button" className="block w-full rounded-md px-3 py-2 text-left text-sm text-text hover:bg-surface-raised" onClick={() => { openSolution(entry); setMenu(null); }}>View Solution</button><button type="button" className="block w-full rounded-md px-3 py-2 text-left text-sm text-text hover:bg-surface-raised" onClick={() => { void navigator.clipboard.writeText(entry.result); setMenu(null); }}>Copy Result</button><button type="button" className="block w-full rounded-md px-3 py-2 text-left text-sm text-error hover:bg-error/5" onClick={() => void remove(entry)}>Delete</button></div>}
                </div>
            </div>
            <div className="mt-5 grid gap-3 border-t border-surface-border pt-4 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="text-xs font-medium uppercase tracking-wide text-text-muted">Inputs</p><p className="mt-1 break-words font-math text-sm text-text-muted">{inputs(entry.inputs) || 'No inputs recorded'}</p></div><div className="sm:text-right"><p className="text-xs font-medium uppercase tracking-wide text-text-muted">Result</p><p className="mt-1 break-all font-math text-xl font-semibold text-text">{entry.result}</p></div></div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><time dateTime={entry.createdAt} className="text-xs text-text-muted">{time(entry.createdAt)}</time><Button type="button" variant="secondary" className="text-sm" onClick={() => openSolution(entry)}>View Solution</Button></div>
        </article>
    );

    return <div className="space-y-8"><header><h1 className="text-3xl font-bold tracking-tight text-text">History</h1><p className="mt-2 max-w-2xl text-text-muted">Review, revisit, and manage your solver activity.</p></header><Card><div className="space-y-4"><Input label="Search history" placeholder="Search by expression or type" value={search} onChange={(event) => setSearch(event.target.value)} /><div className="flex flex-wrap gap-2" aria-label="Filter calculation type">{FILTERS.map((option) => <Button key={option.value} type="button" variant={filter === option.value ? 'primary' : 'secondary'} aria-pressed={filter === option.value} onClick={() => setFilter(option.value)}>{option.label}</Button>)}</div></div></Card>{error && <p role="alert" className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">{error}</p>}{loading && <p className="text-sm text-text-muted">Loading your calculations...</p>}{!loading && !error && visible.length === 0 && <Card title={entries.length === 0 ? 'No calculation history yet' : 'No matching calculations'}><p className="text-sm text-text-muted">{entries.length === 0 ? 'Complete a calculation in the Solver and it will appear here.' : 'Try a different search or calculation type.'}</p></Card>}{!loading && visible.length > 0 && <div className="space-y-8">{Object.entries(groups).map(([name, items]) => <section key={name} aria-labelledby={`history-${name}`}><h2 id={`history-${name}`} className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">{name}</h2><div className="space-y-4">{items.map(card)}</div></section>)}</div>}{solution && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="solution-title" onClick={() => setSolution(null)}><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-surface-border bg-surface-raised p-5 sm:p-6" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><h2 id="solution-title" className="text-xl font-semibold text-text">Solution</h2><p className="mt-1 text-sm text-text-muted">{typeLabel(solution.problemType)}</p></div><button type="button" aria-label="Close solution" onClick={() => setSolution(null)} className="rounded-md px-2 py-1 text-xl text-text-muted hover:bg-surface hover:text-text">&times;</button></div><div className="mt-6"><SolverResult result={solution.solverResult} /></div></div></div>}</div>;
}
