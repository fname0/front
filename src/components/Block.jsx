import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loadImg from '../assets/load.svg'

const Block = () => {

    const [isLoading , SetisLoading] = useState(false);
    

    const [BlockedUser , SetBlockedUser] = useState([]);
    useEffect(()=>{
        fetchData()
    }, [])

    const fetchData = async()=>{
        SetisLoading(true)
        await axios.get('http://100.73.29.190:5000/users').then(e=>
            {
                SetBlockedUser(e.data)
                console.log(e.data);
                
            }
        )
        SetisLoading(false)
    }
    
    const [CheckBan , SetCheckBan] = useState(false);

    const [Id , SetId] = useState('');

    const [Username , SetUsername] = useState('');
    

    const [Banned , SetBanned] = useState('');
    
    
    

    const toggleBanned = (id, username, banned)=>{
        SetCheckBan(true)
        SetId(id)
        SetBanned(banned)
        SetUsername(username)
    }

    const postBanned = async()=>{
        // console.log(
        //     {
        //         id: Id,
        //         banned: Math.abs(Number(Banned)-1).toString()
        //     }
        // );
        
        await axios.post('http://100.73.29.190:5000/changeblock',
            {
                id: Id,
                banned: Math.abs(Number(Banned)-1).toString()
            }
        ).then(e=>console.log(e))
        // window.location.reload();
    }

    return(
        <div className='Block'>
            {isLoading?
      <div className='window'>
        <div className="load">
          <img src={loadImg} alt="" width={200}/>
        </div>
        

      </div> 
       :null
    }
            {CheckBan?
            <div className='window'>
                <div className="ban-window">
                    <p>{Banned=='1'?'Разблокировать': 'Заблокировать'} пользователся <span style={{fontWeight: 800}}>{Username}</span></p>
                    <button onClick={postBanned}>Подтвердить</button>
                </div>
                

            </div>:null}
        <div className='user-list' onClick={e=>e.stopPropagation()}>
            <table>
                <thead>
                    <tr>
                        <th>user_id</th>
                        <th>username</th>
                        <th>Опции</th>
                    </tr>
                </thead>
                <tbody>
                    {BlockedUser.map((e, id)=>
                        <tr key={id}>
                            <td>{e.user_id}</td>
                            <td>{e.username}</td>
                            <td style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={
                                ()=>toggleBanned(e.id, e.username, e.banned)
                            }>{e.banned=='1'?'Разблокировать':'Заблокировать'}
                            </td>
                            
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default Block