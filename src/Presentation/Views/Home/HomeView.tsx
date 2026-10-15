"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import DD from "@/Presentation/ui/dd";

export default function HomeView() {
  const [times, setTimes] = useState([
    { id: 1, time: "10:30:00" },
    { id: 2, time: "11:00:00" },
    { id: 3, time: "11:30:00" },
    { id: 4, time: "12:00:00" },
  ]);

  return (
    <>
      <DD value={times} hidden />

      <div className="md:grid grid-cols-4 lg:grid-cols-5 mb-6">
        <div className="col-span-2 lg:col-span-3 grid grid-cols-2 gap-4">
          {times.map(({ time, id }, i) => (
            <Input
              key={i}
              className={cn(
                "min-w-32 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-min",
                { "self-end justify-self-end": id === 1 },
                { "self-end justify-self-start": id === 2 },
                { "self-start justify-self-end": id === 3 },
                { "self-start justify-self-start": id === 4 }
              )}
              value={time}
              onChange={(e) => {
                const newTimes = times.map((t) =>
                  t.id === id ? { ...t, time: e.target.value } : t
                );
                setTimes(newTimes);
              }}
              type="time"
              step="1"
            />
          ))}
        </div>

        <div className="col-span-2 lg:col-span-2 p-4 flex bg-gray-100">
          <button
            className={cn(
              "w-32 lg:w-36 h-32 lg:h-36",
              "m-auto rounded-full cursor-pointer",
              "bg-gray-500/75 text-white text-sm font-bold uppercase"
            )}
          >
            marcar!
          </button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dia</TableHead>
            <TableHead>Entrada 1</TableHead>
            <TableHead>Saida 1</TableHead>
            <TableHead>Entrada 2</TableHead>
            <TableHead>Saida 2</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </>
  );
}
