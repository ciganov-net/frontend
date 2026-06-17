"use client";

import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle, Ban, Ticket, Calendar, FileQuestion } from 'lucide-react';

export const UserBets = () => {
  //TODO поменять на хук
  const [bets] = useState([
  {
    id: '1',
    status: 'WON',
    amount: 500.00,
    totalCoefficient: 2.53,
    potentialPayout: 1265.00,
    actualPayout: 1265.00,
    eventName: 'event1',
    outcomeName: 'outcome1',
    createdAt: '17.06.2026, 11:30'
  },
  {
    id: '2',
    status: 'PENDING',
    amount: 1000.00,
    totalCoefficient: 1.85,
    potentialPayout: 1850.00,
    actualPayout: null,
    eventName: 'EVENT2EVENT2',
    outcomeName: 'outcomeoutcome',
    createdAt: '17.06.2026, 11:35'
  },
  {
    id: '3',
    status: 'LOST',
    amount: 300.00,
    totalCoefficient: 4.20,
    potentialPayout: 1260.00,
    actualPayout: 0.00,
    eventName: 'EVENT3EV',
    outcomeName: 'asdf asfd ',
    createdAt: '16.06.2026, 22:15'
  },
  {
    id: '4',
    status: 'CANCELLED',
    amount: 2000.00,
    totalCoefficient: 1.50,
    potentialPayout: 12345.00,
    actualPayout: 1243.00,
    eventName: 'EVENT4EVENT4EVENT',
    outcomeName: 'outcome tooerf',
    createdAt: '15.06.2026, 14:00'
  },
  {
    id: '5',
    status: 'smth_status',
    amount: 2000.00,
    totalCoefficient: 3.54,
    potentialPayout: 3000.00,
    actualPayout: 1234.00,
    eventName: 'EVENT 5',
    outcomeName: 'asdq q',
    createdAt: '15.06.2026, 14:00'
  }
]);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 pb-5">
          <Ticket className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Мои ставки</h1>
          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
            Количество: {bets.length}
          </span>
        </div>

        <div className="grid gap-4">
          {bets.map((bet) => {
            return (
              <div 
                key={bet.id} 
                className="rounded-xl border p-4 flex items-center"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    {bet.status === 'WON' ? (
                      <div className={`inline-flex gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-emerald-500/10 border-emerald-500/30 text-emerald-400`}>
                        <CheckCircle2 className="h-4 w-4" />ВЫЙГРЫШ
                      </div>
                    ) : bet.status === 'LOST' ? (
                      <div className={`inline-flex gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-rose-500/10 border-rose-500/30 text-rose-400`}>
                        <XCircle className="h-4 w-4" />ПОТРАЧЕНО
                      </div>
                    ) : bet.status === 'PENDING' ? (
                      <div className={`inline-flex gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-amber-500/10 border-amber-500/30 text-amber-400`}>
                        <Clock className="h-4 w-4" />Ждём....
                      </div>
                    ) : bet.status === 'CANCELLED' ? (
                      <div className={`inline-flex gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-zinc-500/10 border-zinc-500/30 text-zinc-400`}>
                        <Ban className="h-4 w-4" />Отменено
                      </div>
                    ) : (
                      <div className={`inline-flex gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-gray-500/10 border-gray-500/30 text-gray-400`}>
                        <FileQuestion className="h-4 w-4" />UNKNOWN
                      </div>
                    )}
                    
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{bet.createdAt}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {bet.eventName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Исход: <span className="text-foreground">{bet.outcomeName}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 grid-cols-4 gap-8">
                  <div>
                    <p className="text-xs text-muted-foreground">СТАВКА</p>
                    <p className="text-sm font-bold mt-1 text-foreground">{bet.amount.toFixed(2)} ₽</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">КОЭФФИЦИЕНТ</p>
                    <p className="text-sm font-black mt-1 text-primary">{bet.totalCoefficient.toFixed(2)}x</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ВОЗМОЖНЫЙ ДОХОД</p>
                    <p className="text-sm font-bold mt-1 text-muted-foreground">{bet.potentialPayout.toFixed(2)} ₽</p>
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <p className="text-xs text-muted-foreground">ИТОГ</p>
                    <p className={`text-base font-black mt-0.5 ${
                      bet.status === 'WON' ? 'text-emerald-400' : 
                      bet.status === 'LOST' ? 'text-rose-400 line-through' : 
                      bet.status === 'PENDING' ? 'text-amber-400' : 'text-zinc-400'
                    }`}>
                      {bet.actualPayout !== null ? `${bet.actualPayout.toFixed(2)} ₽` : '—'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}