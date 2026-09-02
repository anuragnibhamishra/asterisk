import type { SolverResult, ProblemType } from '@/types';
import { supabase } from './supabase';

export interface HistoryEntry {
  id: string;
  problemType: ProblemType | string;
  expression: string;
  result: string;
  inputs: Record<string, string>;
  solverResult: SolverResult;
  isFavorite: boolean;
  createdAt: string;
}

interface HistoryRow {
  id: string;
  problem_type: string;
  expression: string;
  result: string;
  inputs: Record<string, string>;
  solver_result: SolverResult;
  is_favorite: boolean;
  created_at: string;
}

function mapHistoryRow(row: HistoryRow): HistoryEntry {
  return {
    id: row.id,
    problemType: row.problem_type,
    expression: row.expression,
    result: row.result,
    inputs: row.inputs,
    solverResult: row.solver_result,
    isFavorite: row.is_favorite,
    createdAt: row.created_at,
  };
}

export async function saveHistoryEntry(
  problemType: ProblemType,
  values: Record<string, string>,
  solverResult: SolverResult,
): Promise<void> {
  const { error } = await supabase.from('calculation_history').insert({
    problem_type: problemType,
    expression: solverResult.substitutedFormula,
    result: solverResult.answer,
    inputs: values,
    solver_result: solverResult,
  });

  if (error) {
    throw error;
  }
}

export async function getHistoryEntries(): Promise<HistoryEntry[]> {
  const { data, error } = await supabase
    .from('calculation_history')
    .select('id, problem_type, expression, result, inputs, solver_result, is_favorite, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return ((data ?? []) as HistoryRow[]).map(mapHistoryRow);
}

export async function updateHistoryFavorite(id: string, isFavorite: boolean): Promise<void> {
  const { error } = await supabase
    .from('calculation_history')
    .update({ is_favorite: isFavorite })
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  const { error } = await supabase.from('calculation_history').delete().eq('id', id);

  if (error) {
    throw error;
  }
}