import './Costs.scss';

import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit, FaRegSave } from "react-icons/fa";

import { useState, useEffect } from 'react';
import axios from 'axios';

import Message from '../Message/Message';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { format } from 'date-fns';

const Costs = ({ onNewData, onDeleteData, onEditData }) => {
  const [revenues, setRevenues] = useState([]);
  const [message, setMessage] = useState('');
  const [edit, setEdit] = useState(null); // Inicialmente null

  const getRevenues = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/expenses');
      setRevenues(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  const deleteRevenue = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/expenses/${userId}`);
      setRevenues(revenues.filter((user) => user.id !== userId));
      setMessage('Item excluído com sucesso!');
      onDeleteData(revenues.filter((user) => user.id !== userId));
    } catch (error) {
      console.log(error);
      setMessage('Erro ao excluir o item.');
    }
  };

  const handleEdit = (revenue) => {
    setEdit({ ...revenue, date: new Date(revenue.date) });
  };

  const handleSaveChanges = async (e, updatedRevenue) => {
    e.preventDefault();

    // Formatar a data para yyyy-MM-dd
    const formattedDate = updatedRevenue.date.toISOString().split('T')[0];

    try {
      const response = await axios.put(`http://localhost:4000/api/expenses/${updatedRevenue.id}`, {
        ...updatedRevenue,
        date: formattedDate
      });
      const revenueIndex = revenues.findIndex((revenue) => revenue.id === updatedRevenue.id);
      setMessage('Item atualizado com sucesso!');
      if (revenueIndex !== -1) {
        const newRevenues = [...revenues];
        newRevenues[revenueIndex] = { ...updatedRevenue, date: formattedDate };
        setRevenues(newRevenues);
        setEdit(null);
        onEditData(updatedRevenue);
      }
    } catch (error) {
      console.log(error);
      setMessage('Erro ao atualizar o item.');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  useEffect(() => {
    getRevenues();
  }, [onNewData]);

  return (
    <>
      <div className='container'>
        {revenues && revenues.map((revenue) => (
          <div key={revenue.id} className='container-item'>
            <div className='edit-del'>
              <p onClick={() => handleEdit(revenue)}><FaRegEdit /></p>
              <h3>{revenue.category}</h3>
              <p onClick={() => deleteRevenue(revenue.id)}><MdDeleteForever /></p>
            </div>
            <h5>{revenue.type === 'expense' ? 'Despesas' : 'Renda'}</h5>
            <p>{formatDate(revenue.date)}</p>
            <h4>{formatCurrency(revenue.value)}</h4>
            <p className='description'>{revenue.description}</p>

            {edit && edit.id === revenue.id && (
              <div className='edit'>
                <form onSubmit={(e) => handleSaveChanges(e, edit)} className='form'>
                  <input
                    type="text"
                    placeholder='Categoria'
                    value={edit.category}
                    onChange={(e) => setEdit({ ...edit, category: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder='Descrição'
                    value={edit.description}
                    onChange={(e) => setEdit({ ...edit, description: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder='Valor'
                    value={edit.value}
                    onChange={(e) => setEdit({ ...edit, value: e.target.value })}
                    required
                  />
                  <DatePicker
                    selected={edit.date}
                    onChange={(date) => setEdit({ ...edit, date })}
                    dateFormat="dd/MM/yyyy"
                    className='custom-datepicker'
                  />
                  <select
                    value={edit.type}
                    onChange={(e) => setEdit({ ...edit, type: e.target.value })}
                  >
                    <option value="income">Renda</option>
                    <option value="expense">Despesa</option>
                  </select>
                  <button type='submit'><FaRegSave /></button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {message && <Message message={message} onClose={() => setMessage('')} />}
    </>
  );
};

export default Costs;
