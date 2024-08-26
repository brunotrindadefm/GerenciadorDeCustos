import { useEffect, useState } from 'react'
import './Message.scss'

const Message = ({ message, onClose }) => {

    const [type, setType] = useState('');

    useEffect(() => {
        if (message.includes('Erro')) {
            setType('error');
        } else if (message.includes('sucesso')) {
            setType('success');
        } else {
            setType('');
        }

        const timer = setTimeout(() => {
            onClose();
        }, 3000); 
        return () => clearTimeout(timer);
    }, [message, <onClose></onClose>])

    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
        </div>
    )
}

export default Message
