import './Revenue.scss'

import axios from 'axios'
import { useState, useEffect } from 'react'

const Revenue = ({onNewData, onDeleteData, onEditData}) => {

    const [gains, setGains] = useState(0);
    const [loss, setLoss] = useState(0);
    const [profit, setProfit] = useState(0);
    const [revenue, setRevenue] = useState('');

    const getRevenue = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/expenses');
            const data = response.data;

            let totalGains = 0;
            let totalLoss = 0;

            data.forEach(item => {
                const value = parseFloat(item.value);
                if (item.type === 'income') {
                    totalGains += isNaN(value) ? 0 : value;
                } else if (item.type === 'expense') {
                    totalLoss += isNaN(value) ? 0 : value;
                }
            });

            if (totalGains - totalLoss < 0) {
                setRevenue('Despesas')
            } else {
                setRevenue('Lucro')
            }

            setGains(totalGains);
            setLoss(totalLoss);
            setProfit(totalGains - totalLoss)

        } catch (error) {
            console.log(error);
        }
    };
    console.log(gains)

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    }    

    useEffect(() => {
        getRevenue();
    },[onNewData, onDeleteData, onEditData]);

    return (
        <div className='revenue'>
            <div>
                <h2>Ganhos</h2> 
                <p>{formatCurrency(gains)}</p>
            </div>
            <div>
                <h2>Percas</h2>
                <p>{formatCurrency(loss)}</p>
            </div>
            <div>
                <h2>{revenue}</h2>
                <p>{formatCurrency(profit)}</p>
            </div>
        </div>
    )
}

export default Revenue
