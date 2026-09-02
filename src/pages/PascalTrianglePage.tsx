import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { combinationBigInt } from '@/math/utils';

interface TriangleEntry {
  row: number;
  position: number;
  value: bigint;
}

const DEFAULT_ROWS = 8;
const MAX_ROWS = 30;

function createTriangle(rows: number): TriangleEntry[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: row + 1 }, (_, position) => ({
      row,
      position,
      value: combinationBigInt(row, position),
    })),
  );
}

export function PascalTrianglePage() {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [inputValue, setInputValue] = useState(String(DEFAULT_ROWS));
  const [selected, setSelected] = useState<TriangleEntry | null>(null);
  const [error, setError] = useState('');

  const triangle = createTriangle(rows);

  const handleRowsChange = (value: string) => {
    setInputValue(value);
    setSelected(null);

    if (value === '') {
      setError('Enter the number of rows.');
      return;
    }

    const nextRows = Number(value);
    if (!Number.isInteger(nextRows) || nextRows < 1 || nextRows > MAX_ROWS) {
      setError(`Rows must be a whole number from 1 to ${MAX_ROWS}.`);
      return;
    }

    setError('');
    setRows(nextRows);
  };

  const getCalculation = (entry: TriangleEntry) => {
    if (entry.position === 0 || entry.position === entry.row) {
      return {
        formula: `C(${entry.row}, ${entry.position}) = 1`,
        explanation: 'Every outside value in Pascal\'s triangle is 1.',
      };
    }

    const left = combinationBigInt(entry.row - 1, entry.position - 1);
    const right = combinationBigInt(entry.row - 1, entry.position);
    return {
      formula: `C(${entry.row}, ${entry.position}) = C(${entry.row - 1}, ${entry.position - 1}) + C(${entry.row - 1}, ${entry.position})`,
      explanation: `${left} + ${right} = ${entry.value}`,
    };
  };

  const selectedCalculation = selected ? getCalculation(selected) : null;

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Pascal&apos;s Triangle
        </h1>
        <p className="mt-3 text-text-muted">
          Explore the pattern row by row. Select any number to see its position and calculation.
        </p>
      </header>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <Card
          title="Triangle size"
          description={`Choose between 1 and ${MAX_ROWS} rows.`}
          className="min-w-0"
        >
          <Input
            label="Number of rows"
            type="number"
            min={1}
            max={MAX_ROWS}
            step={1}
            value={inputValue}
            error={error}
            onChange={(event) => handleRowsChange(event.target.value)}
          />

          <div className="mt-8 w-full max-w-full overflow-x-auto overflow-y-hidden pb-2">
            <div className="flex flex-col items-center gap-2 px-4">
              {triangle.map((row) => (
                <div key={row[0].row} className="flex items-center gap-2 sm:gap-3">
                  {row.map((entry) => {
                    const isSelected = selected?.row === entry.row && selected.position === entry.position;
                    return (
                      <Button
                        key={`${entry.row}-${entry.position}`}
                        type="button"
                        variant={isSelected ? 'primary' : 'secondary'}
                        aria-label={`Row ${entry.row + 1}, position ${entry.position + 1}, value ${entry.value}`}
                        aria-pressed={isSelected}
                        className="h-10 min-w-10 px-2 font-math sm:h-11 sm:min-w-11"
                        onClick={() => setSelected(entry)}
                      >
                        {entry.value.toString()}
                      </Button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card
          title="Selected number"
          description="Click a number in the triangle."
          className="lg:sticky lg:top-24"
        >
          {selected && selectedCalculation ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-muted">Value</p>
                <p className="mt-1 font-math text-3xl text-primary">{selected.value.toString()}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">Position</p>
                <p className="mt-1 text-text">
                  Row {selected.row + 1}, position {selected.position + 1}
                </p>
              </div>
              <div className="border-t border-surface-border pt-4">
                <p className="text-sm text-text-muted">How it is calculated</p>
                <p className="mt-2 break-words font-math text-sm leading-6 text-text">
                  {selectedCalculation.formula}
                </p>
                <p className="mt-2 font-math text-sm text-primary">
                  {selectedCalculation.explanation}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-6 text-text-muted">
              Select a number to inspect its row, position, and calculation.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
