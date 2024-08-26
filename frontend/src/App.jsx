import Costs from './components/Costs/Costs'
import Form from './components/Form/Form'
import Revenue from './components/Revenue/Revenue'
import './index.css'

import { useState } from 'react'

function App() {

  const [onNewData, setNewData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleNewData = (data) => {
    setNewData(data);
  };

  const handleDeleteData = (data) => {
    setDeleteData(data);
  };

  const handleEditData = (data) => {
    setEditData(data);
  }

  return (
    <div className='app'>
      <Revenue
        onNewData={onNewData}
        onDeleteData={deleteData} 
        onEditData={editData}
      />
      <Form onNewData={handleNewData} />
      <Costs
        onDeleteData={handleDeleteData}
        onNewData={onNewData}
        onEditData={handleEditData}
      />
    </div>
  )
}

export default App
