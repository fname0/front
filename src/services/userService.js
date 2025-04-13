import axios from "axios";

// Mock service - in a real app, this would make API calls
// const users = [
//     { user_id: 1, username: 'Jeff', place: 4, cur_date: '12.04.2025', start_time: '10:10', end_time: '14:00' },
//     { user_id: 2, username: 'Bob', place: 7, cur_date: '13.04.2025', start_time: '11:10', end_time: '20:20' },
//     {user_id: 1, username: 'Jeff', place: 4, cur_date: '13.04.2025', start_time: '13:00', end_time: '16:00'}
//   ];
  
  export const getUsers = async (isActive) => {
    const users = await axios.get('http://100.73.29.190:5000/'+isActive)
    .then(e=>{
      console.log(e.data);
      
      return e.data})
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 500));
    return [...users];
  };
  
  // export const createUser = async (userData) => {
  //   await new Promise(resolve => setTimeout(resolve, 500));
  //   const newUser = {
  //     id: users.length + 1,
  //     ...userData,
  //     createdAt: new Date()
  //   };
  //   users.push(newUser);
  //   return newUser;
  // };
  
  export const deleteUser = async (id) => {
    await axios.post('http://100.73.29.190:5000/delete',
      {
        id: id
      }
    ).then(e=>console.log(e.data)
    )
  };