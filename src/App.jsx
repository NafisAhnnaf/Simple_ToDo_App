import React, {useState, useEffect} from 'react'
//import './App.css'

const JSXOne = () => {
  return (
    <div className='text-center p-4'>
      No Tasks Added
    </div>
  );
}

const App = () => {
  //const [done, setDone] = useState(false);
  const [status, setStatus] = useState('Not Done');
  const [strike, setStrike] = useState('');  
  const [item, setItem] = useState('');
  const [mounted, setMounted] = useState(false);
  const [list, setList] = useState([]);

  // useEffect(()=>{
  //   if(done){
  //     setStrike(' line-through text-gray-600')
  //     setStatus('Done')
  //   }
  //   else{
  //     setStrike('');
  //     setStatus('Not Done')
  //   }
    
  // },[done])

   //On browser load, reload (mount) the data stored in browser is fetched: 
   useEffect(()=>{
    const newList = JSON.parse(localStorage.getItem('Tasks'));
    if(newList){
      setList(newList);
    }
  },[])
  
  
  //Local storage is used for storing the list of tasks: 
  useEffect(()=>{
    if (mounted) {
      localStorage.setItem('Tasks', JSON.stringify(list));
    } else {
      setMounted(true);
    }
  },[list]);



  const handleDone= (i)=>{
    const newList = [...list];
    newList[i].done = !newList[i].done;
    setList(newList);
}
  const handleRemove = (i)=>{
    const newList = [...list];
    newList.splice(i,1);
    setList(newList);
  }

  const addItem = ()=>{
    if(item.trim() !== ''){
      setList([
        ...list,
        {done: false, itm: item}
      ]);
      setItem('');
    }
  }
  return (
    <div className='min-h-screen p-8 w-full flex flex-col items-center bg-[#232323] text-amber-50  space-y-10'>
      <div className="header text-3xl">To Do App</div>
      <div className="form">
        <form className='space-y-4' action="#">
          <label htmlFor="">Enter Task</label><br />
          <input value={item} onChange={(e)=>{setItem(e.target.value)}} type="text" className='bg-[#191919] placeholder:text-gray-500 border-2 border-white rounded-lg p-1' placeholder='Buy eggs..' required/><br />
          <button onClick={(e)=>{
            e.preventDefault();
            addItem();
          }} className='bg-green-700 p-2 rounded-lg' type='submit'>Add</button>
        </form>
      </div>
      <div className="list w-[800px] table">
        <table className=' w-full' >
          <thead className='border-b-2 border-white'>
            <tr>
              <th>Serial</th>
              <th className='w-1/2'>Task</th>
              <th>Status</th>
              <th>Done</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              list.length==0?JSXOne():list.map((li,index)=>(
                <tr className={'border-b-1 text-center'}>
                  <td >{index+1} </td>
                  <td className={'p-2 text-left'+(li.done?' line-through text-gray-400':'')}>{li.itm}</td>
                  <td>{li.done?'Complete': 'Pending'}</td>
                  <td><button className='bg-green-700 px-1 rounded' onClick={()=>handleDone(index)}>{li.done?'Undo': 'Done'}</button></td>
                  <td><button className='bg-red-700 px-2 rounded-lg' onClick={()=>handleRemove(index)}>X</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App