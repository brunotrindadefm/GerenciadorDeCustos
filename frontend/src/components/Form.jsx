import './Form.scss'

import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = ({ onNewData }) => {

    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [category, setCategory] = useState('');
    const [value, setValue] = useState('');
    const [transactionType, setTransactionType] = useState('income');
    const [message, setMessage] = useState('');

    const createExpenses = async (e) => {
        try {
            e.preventDefault();

            const formattedDate = startDate.toISOString().split('T')[0];

            const response = await axios.post(`http://localhost:4000/expenses`, {
                category,
                description,
                value,
                date: formattedDate,
                transactionType
            });

            setMessage(response.data);
            setCategory('');
            setStartDate(new Date());
            setDescription('');
            setValue('');
            setTransactionType('income');
            onNewData({ category, description, value, date: formattedDate, transactionType });
        } catch (error) {
            setMessage('Erro ao inserir dados');
        }
    }

    return (
        <>
            <div className='form-container'>
                <h1>Gerenciador de custos</h1>
                <form onSubmit={createExpenses} className='form'>
                    <input
                        type="text"
                        placeholder='Categoria'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Descrição'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder='Valor'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />
                    <div className='date'>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className='custom-datepicker'
                        />
                    </div>
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                    >
                        <option value="income">Renda</option>
                        <option value="expense">Despesa</option>
                    </select>
                    <button type='submit'>Adicionar</button>
                </form>
            </div>
            {message && <Message message={message} onClose={() => setMessage('')} />}
        </>
    )
}

export default Form;
