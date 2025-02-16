import React from 'react';
import { Container } from './styles'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {

  const {transactions} = useTransactions()
  const summary = transactions.reduce((acc , t) => { 
    if (t.type === 'deposit') {
      acc.deposits += t.amount 
      acc.total += t.amount
    } else {
      acc.withdraws += t.amount
      acc.total -= t.amount
    }
    return acc
    }, {
      deposits: 0,
      withdraws: 0,
      total: 0
    })


  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Income" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Outcome" />
        </header>
        <strong>
         - {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}</strong>
      </div>
    </Container>
  )
}