import React from 'react';

function UserList({ users, optionBool, onDelete, sortVal, sortTitle }) {
  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>user_id</th>
            <th>username</th>
            <th>place</th>
            <th>cur_date</th>
            <th>start_time</th>
            <th>end_time</th>
            <th>check_in</th>
            {optionBool?
            <th>options</th>
            :null
            }
            
          </tr>
        </thead>
        <tbody>
          {users.filter(user=>{
            // console.log(user[sortTitle], sortVal);
            
            if (sortVal==='') {
              return true
            }else{
              return user[sortTitle]===sortVal
            }
          }
          ).map((user, id) => (
            <tr key={id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.place}</td>
              <td>{user.cur_date}</td>
              <td>{user.start_time}</td>
              <td>{user.end_time}</td>
              <td>{user.check_in}</td>
              {optionBool?
              <td>
              <button className='delete' onClick={() => onDelete(user.id)}>Delete</button>
            </td>:
            null
              }
              
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div onClick={()=>console.log(sortVal)}>clck</div> */}
    </div>
  );
}

export default UserList;