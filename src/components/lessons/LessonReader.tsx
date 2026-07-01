"use client";

import type { LessonSection } from "@/lib/lessons";
import AudioPlayer from "@/components/audio/AudioPlayer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SectionRenderer({ section }: { section: LessonSection }) {
  switch (section.type) {
    case "text":
      return <p className="text-foreground/80 leading-relaxed">{section.content}</p>;

    case "note":
      return (
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
          <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
            Note
          </p>
          <p className="text-amber-700 dark:text-amber-300">
            {section.content}
          </p>
        </div>
      );

    case "example":
      return (
        <div className="rounded-xl border border-border bg-card p-4 space-y-1">
          <p className="georgian-text text-xl flex items-center gap-2">
            {section.georgian}
            <AudioPlayer text={section.georgian} />
          </p>
          <p className="text-sm text-muted-foreground italic">
            {section.transliteration}
          </p>
          <p className="text-sm font-medium">{section.french}</p>
        </div>
      );

    case "conjugation":
      return (
        <div>
          {section.title && (
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {section.title}
            </h3>
          )}
          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  {section.header.map((h, i) => (
                    <TableHead key={i}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell
                        key={j}
                        className={j === 1 ? "georgian-text" : ""}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );

    case "comparison":
      return (
        <div>
          {section.title && (
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {section.title}
            </h3>
          )}
          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableBody>
                {section.rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell
                        key={j}
                        className={
                          j === 0
                            ? "font-medium text-muted-foreground text-xs"
                            : j === 2
                              ? "georgian-text"
                              : ""
                        }
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );

    case "table":
      return (
        <div>
          {section.title && (
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {section.title}
            </h3>
          )}
          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  {section.header.map((h, i) => (
                    <TableHead key={i}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {section.rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell
                        key={j}
                        className={j === 1 ? "georgian-text" : ""}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );

    case "list":
      return (
        <ul className="list-disc pl-5 space-y-1 text-foreground/80">
          {section.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}

interface LessonReaderProps {
  title: string;
  description: string;
  sections: LessonSection[];
}

export function LessonReader({
  title,
  description,
  sections,
}: LessonReaderProps) {
  return (
    <article className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-heading font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {sections.map((section, i) => (
        <div key={i}>
          <SectionRenderer section={section} />
        </div>
      ))}
    </article>
  );
}
