import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const {createTransaction} = useTransactions()

  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')



  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()
    await createTransaction({
      title,
      type,
      amount,
      category
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type='button' onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>
    <Container onSubmit={handleCreateNewTransaction}>
    <h2>Cadastrar transação</h2>
      <input type="text" placeholder='Título' value={title} onChange={event => setTitle(event.target.value)}/>
      <input type="number" step="0.01" placeholder='Valor' value={amount} onChange={event => setAmount(Number(event.target.value))}/>

      <TransactionTypeContainer>
        <RadioBox
          type='button'
          isActive={type === 'deposit'}
          activeColor='green'
          onClick={() => { setType('deposit') }}
        >
          <img src={incomeImg} alt="Entrada" />
          <span>Entrada</span>
        </RadioBox>

        <RadioBox
          type='button'
          isActive={type === 'withdraw'}
          activeColor='red'
          onClick={() => { setType('withdraw') }}
        >
          <img src={outcomeImg} alt="Saida" />
          <span>Saída</span>
        </RadioBox>
      </TransactionTypeContainer>

      <input type="text" placeholder='Categoria' value={category} onChange={event => setCategory(event.target.value)}/>
      <button type="submit">Cadastrar</button>

      </Container>
  </Modal>
  )
}