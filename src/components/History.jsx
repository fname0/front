import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import { getUsers } from '../services/userService';
import load from '../assets/load.svg'

const History = () => {

  const [isLoading , SetisLoading] = useState(false);
  

    const [ListHistory , SetListHistory] = useState([]);
    
    useEffect(()=>{
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
      SetisLoading(true)
      const users = await getUsers('inactive');
      SetListHistory(users);
      SetisLoading(false)
    };

    const [SortArr , SetSortArr] = useState([]);

    const [SortVal , SetSortVal] = useState('');

    const [SortTitle , SetSortTitle] = useState('');
    

    return(
        <div className='History' onClick={e=>e.stopPropagation()}>
          {isLoading?
            <div className='window'>
              <div className='load'>
                <img src={load} width={200}/>
              </div>
            </div>
          :null}
            <h1>История броней</h1>
            <div className="list">
        <p onClick={()=>{
          SetSortArr(
          [...new Set(ListHistory.map(e=>e.username))]
        )
        SetSortVal('')
        SetSortTitle('username')
        }}>имени</p>
        <p onClick={()=>{SetSortArr(
          [...new Set(ListHistory.map(e=>e.place))]
        )
        SetSortVal('')
        SetSortTitle('place')}}>
            месту
        </p>
        <p onClick={()=>{
            let arr = [...ListHistory]
            arr.sort((a, b) => -Date.parse(a.cur_date+' '+a.start_time)+Date.parse(b.cur_date+' '+b.start_time))
        SetListHistory(arr)
            // SetSortPlus(true)
        }
            
            
            }>
            Время↑
        </p>
        <p onClick={()=>{
            let arr = [...ListHistory]
            arr.sort((a, b) => Date.parse(a.cur_date+' '+a.start_time)-Date.parse(b.cur_date+' '+b.start_time))
        SetListHistory(arr)
            // SetSortPlus(true)
        }
            
            }>
            Время↓
        </p>
        </div>
        <hr />
      
      {SortArr.length!==0?
      <div className='sort-val'>
        {SortArr.map((e, id)=>
      <p key={id} onClick={()=>SetSortVal(e)}>
        {e}
      </p>)}
      <p onClick={()=>{
        SetSortArr([])
        SetSortTitle('')
        SetSortVal('')}} className="reset">
        ✕ Сбросить
      </p>
      </div>
      :
      null}
            <UserList users={ListHistory} optionBool={false} sortTitle={SortTitle} sortVal={SortVal}/>            
        </div>
    );
};

export default History