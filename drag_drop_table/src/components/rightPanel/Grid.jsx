import React, { useState } from 'react';
import { tables as tableList } from '../../utilities/constants';
import Table from './Table';

const Grid = () => {
  const [tables, setTables] = useState([...tableList]);
  
  return (
    <div>
      {tables?.map(table=> <Table table={table} key={table?.id} tables={tables} setTables={setTables}/>)}
    </div>
  )
}

export default Grid
