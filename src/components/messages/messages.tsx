import axios from "axios";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from 'react-data-table-component';
import messageInterface from "../../interfaces/messageInterface";



const Messages = () => {

  const [listMessages, setMessages] = useState<messageInterface[]>([]);

  const getMessages = () => {
    axios
      .get('https://extranetapi.gag.com.ar/api/v1/Messages'      )
      .then((data) => {
        setMessages(data.data.items);
      })
      .catch((err) => console.log(err));
  };

 const getMessage = (id:string):void => {
    axios
      .get('https://extranetapi.gag.com.ar/api/v1/Messages/id?id='+id      )
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };


 useEffect(() => {
   getMessages();
  }, []);




const columns: TableColumn<messageInterface>[] = [
{

  cell: (row: messageInterface) => <button className='bg-orange-700 rounded p-2 text-white' onClick={() => getMessage(row.id)}>Show</button>,
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
},
  {
    name: 'Message',
    selector: (row: messageInterface) => row.message,
  },
  {
    name: 'Username',
    selector: (row: messageInterface) => row.username +'('+ row.displayName +')',
  },

];


  getMessages();


return (
      <>
        <div className='bg-red-50'>
        {listMessages[0]?.message}
        </div>

        <DataTable
			columns={columns as TableColumn<messageInterface>[]}
      data={listMessages}
		/>

      </>

 );
};

export default Messages;


