import type { TableCardData } from '@/data/types';
import { CardWrapper } from './CardWrapper';

interface Props {
  data: TableCardData;
}

export function TableCard({ data }: Props) {
  return (
    <CardWrapper>
      {data.title && (
        <h3 className="text-xl font-bold mb-4 text-[var(--color-cta)]">
          {data.title}
        </h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-[var(--color-secondary)]">
              {data.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-[var(--color-text)] opacity-80"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-secondary)]">
            {data.rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-[var(--color-primary-light)] transition-colors duration-150"
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="py-3 px-4 text-sm text-[var(--color-text)] align-top"
                    dangerouslySetInnerHTML={{
                      // We optionally wrap backticks with simple code styling
                      __html: cell.replace(
                        /`([^`]+)`/g,
                        '<code class="px-1.5 py-0.5 rounded bg-[var(--color-primary)] text-[var(--color-cta)] font-mono text-xs">$1</code>'
                      ),
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardWrapper>
  );
}
