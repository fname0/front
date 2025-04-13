import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import UserDetail from './UserDetail';
import { getUsers, deleteUser } from '../services/userService';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import History from './History';
import View from './View';
import Otchet from './Otchet';
import loadImg from '../assets/load.svg'
import Block from './Block';
// import './styles.css';

function Main() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'form', 'detail'
  const [OpenHistory , SetOpenHistory] = useState(false);
  
  const [isLoading , SetisLoading] = useState(false);
  

  const navigate = useNavigate()

  const fetchUsers = async () => {
    SetisLoading(true) 
    const users = await getUsers('active');
    setUsers(users);
    SetisLoading(false)
  };

  useEffect(() => {
    if (Cookies.get('username')==='admin' && Cookies.get('password')==='admin123'){
      
      // console.log('load');
      
        fetchUsers();
      
    }
    else{
        navigate('/')
    }

  }, [navigate]);




  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setViewMode('form');
  };

  const handleViewUser = (user) => {
    setCurrentUser(user);
    setViewMode('detail');
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
    setViewMode('list');
  };

  const handleSubmit = async (userData) => {
    if (isEditing) {
      // await updateUser(currentUser.id, userData);
    } else {
      // await createUser(userData);
    }
    fetchUsers();
    setViewMode('list');
  };

  const handleBackToList = () => {
    setViewMode('list');
  };


  const [SortArr , SetSortArr] = useState([]);

  const [SortTitle , SetSortTitle] = useState('');
  
  const [SortVal , SetSortVal] = useState('');

  const [OpenView , SetOpenView] = useState(false);

  const [OpenOtchet , SetOpenOtchet] = useState(false);

  const [OpenBlock , SetOpenBlock] = useState(false);
  
  // const [Open , SetOpen] = useState();
  
  
  
  

  return (
    <div className="app-container">
      {isLoading?
      <div className='window'>
        <div className="load">
          <img src={loadImg} alt="" width={200} height={200}/>
        </div>
        

      </div> 
      :null}
      {
        OpenHistory?
        <div className='window' onClick={()=>SetOpenHistory(false)}>
          <History sortTitle={SortTitle} sortVal={SortVal}/>
        </div>
        :null
      }
      {
        OpenView?
        <div className="window" onClick={()=>SetOpenView(false)}>
          <View/>
        </div>
        :null
      }
      {
        OpenOtchet?
        <div className="window" onClick={()=>SetOpenOtchet(false)}>
          <Otchet/>
        </div>
        :null
      }
      {OpenBlock?
      <div onClick={()=>SetOpenBlock(false)} className='window'>
        <Block/>
      </div>
      :null}
      <h1>Администрация</h1>
      <div onClick={()=>SetOpenHistory(true)} className='btn'>
        История броней
      </div>
      <div className="btn" onClick={()=>SetOpenView(true)}>
        Зал
      </div>
      <div onClick={()=>SetOpenOtchet(true)} className="btn">
        Отчёт
      </div>
      <div onClick={()=>navigate('/graph')} className="btn">
      График
        {/* <Link style={{color: 'white', textDecoration: 'none'}} to='/graph'>График</Link> */}
      </div>
      <div onClick={()=>SetOpenBlock(true)} className="btn">
        Пользователи
      </div>
      <div className="btn" onClick={()=>navigate('/comment')}>
        Отзывы
      </div>


      <div className="sort">
        <h2 style={{margin: 0}}>Сортировать по:</h2>
        <div className="list">
        <p onClick={()=>{
          SetSortArr(
          [...new Set(users.map(e=>e.username))]
        )
        SetSortVal('')
        SetSortTitle('username')
        }}>имени</p>
        <p onClick={()=>{SetSortArr(
          [...new Set(users.map(e=>e.place))]
        )
        SetSortVal('')
        SetSortTitle('place')}}>месту</p>
        <p onClick={()=>{SetSortArr(
          [...new Set(users.map(e=>e.cur_date))]
        )
        SetSortVal('')
        SetSortTitle('cur_date')}}>дате</p>
        <p onClick={()=>{
          SetSortArr([0, 1])
          SetSortVal('')
          SetSortTitle('check_in')
        }}>
          Check-in
        </p>
        </div>
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

      {viewMode === 'list' && (
        <>
          <UserList 
            sortVal={SortVal}
            sortTitle={SortTitle}
            users={users} 
            onEdit={handleEditUser} 
            onView={handleViewUser}
            onDelete={handleDeleteUser}
            optionBool={true}
          />
        </>
      )}
      


      {viewMode === 'form' && (
        <UserForm 
          user={currentUser} 
          onSubmit={handleSubmit} 
          onCancel={handleBackToList} 
          isEditing={isEditing}
        />
      )}
      
      {viewMode === 'detail' && (
        <UserDetail 
          user={currentUser} 
          onBack={handleBackToList} 
          onEdit={() => handleEditUser(currentUser)}
        />
      )}
      {/* <Link to={'/test'}>test</Link> */}
    </div>
  );
}

export default Main;