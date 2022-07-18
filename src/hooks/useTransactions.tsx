import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number,
  title: string
  amount: number
  category: string
  createdAt: Date
  type: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  createTransaction: (transaction: TransactionInput) => Promise<void>
  transactions: Transaction[]
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    setTransactions([
      ...transactions,
      response.data.transaction
    ])
  }

  return (
    <TransactionsContext.Provider value={{createTransaction, transactions}}>
      {children}
    </TransactionsContext.Provider>)
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}