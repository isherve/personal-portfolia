import { ReactNode } from "react";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Bold matching skill/tech terms inside resume paragraph text. */
export function emphasizeTerms(text: string, terms: string[]): ReactNode {
  const unique = [...new Set(terms.filter(Boolean))].sort((a, b) => b.length - a.length);
  if (!unique.length) return text;

  let nodes: ReactNode[] = [text];

  for (const term of unique) {
    const next: ReactNode[] = [];
    const regex = new RegExp(`(${escapeRegex(term)})`, "gi");

    for (const node of nodes) {
      if (typeof node !== "string") {
        next.push(node);
        continue;
      }

      const parts = node.split(regex).filter((part) => part.length > 0);
      parts.forEach((part, index) => {
        if (part.toLowerCase() === term.toLowerCase()) {
          next.push(
            <strong key={`${term}-${index}`} className="font-black text-[#0f172a]">
              {part}
            </strong>,
          );
        } else {
          next.push(part);
        }
      });
    }

    nodes = next;
  }

  return <>{nodes}</>;
}

/** Bold the leading action phrase in an experience bullet. */
export function boldBulletLead(text: string): ReactNode {
  const match = text.match(/^(.+?)(,\s| — | – )/);
  if (!match) {
    return <strong className="font-black text-[#0f172a]">{text}</strong>;
  }

  const lead = match[1];
  const rest = text.slice(lead.length);

  return (
    <>
      <strong className="font-black text-[#0f172a]">{lead}</strong>
      <span className="font-semibold text-[#334155]">{rest}</span>
    </>
  );
}
