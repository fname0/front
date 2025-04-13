import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { exportToExcel } from './Export_to_excel';
// import { getUsers } from '../services/userService';
// import { makeStyles } from '@mui/material';


const Otchet = () => {

    const [Summa , SetSumma] = useState(0);

    // const [DateCal , SetDateCal] = useState();

    const [Users , SetUsers] = useState([]);

    const [FlagItog , SetFlagItog] = useState(false);
    
    

    const fetchUsers = async () => {
    //   const users = await getUsers('inactive');

    const users = [
        { user_id: '1', username: 'Jeff', place: '4', cur_date: '12.04.2025', start_time: '10:10', end_time: '14:00', check_in: '0' },
        { user_id: '2', username: 'Bob', place: '7', cur_date: '13.04.2025', start_time: '11:10', end_time: '20:20', check_in: '1' },
        {user_id: '1', username: 'Jeff', place: '4', cur_date: '13.04.2025', start_time: '13:00', end_time: '16:00', check_in: '1'}
    ]
      SetUsers(users);
    };

    useEffect(()=>{
        fetchUsers()
    }, [])

    const [ArrTime , SetArrTime] = useState();
    
    const [SummaUser , SetSummaUser] = useState([]);
    
    

    const result = (arr)=>{
        SetFlagItog(true)

        SetArrTime(arr)
        const start = new Date(arr[0])
        const end = new Date(arr[1])

        let summauser_arr = []
        
        let ans_arr = []
        let ans = 0
        for (let i = 0; i < Users.length; i++) {
            let t = Users[i].cur_date
            if (t.split('.')[0].length === 1) {
                t = `0${t}`;
            }
            t  = new Date(t.substring(6,10), Number(t.substring(3,5))-1, t.substring(0,2));

            if (t>=start && t<=end){
                let hours = Number(Users[i].end_time.substring(0,2))-Number(Users[i].start_time.substring(0,2))
                if (Number(Users[i].end_time.substring(3,5))-Number(Users[i].start_time.substring(3,5))>0){
                    hours++
                }
                ans+=hours*200
                summauser_arr.push(hours*200)
                ans_arr.push(Users[i])
            }
            
        }
        SetSummaUser(summauser_arr)
        SetSumma(ans)
        // console.log(ans);
        return ans_arr
        
    }

    const make_excel = ()=>{
        // console.log('work');

        const arr0 = result(ArrTime)

        let result_arr = [Object.keys(arr0[0])]
        
        for (let i = 0; i < arr0.length; i++) {
            let line = []
            for (const key in result_arr[0]) {
                line.push(arr0[i][result_arr[0][key]])
            }
            line.push(SummaUser[i]+' р.')
            result_arr.push(line)
        }
        console.log(SummaUser);
        
        result_arr.push(['Суммарная выручка: '+Summa+' рублей'])

        result_arr.push(['Всего часов: '+Summa/200])
        
        exportToExcel(result_arr)
    }

    return(
        <div className='Otchet' onClick={e=>e.stopPropagation()}>
            <Calendar className='calendar' selectRange={true} onChange={e=>result(e)
            }/>
            {FlagItog?
            <h2>Итог: {Summa} рублей.</h2>
            :
            <h2>Выберите промежуток на календаре</h2>}
            <button onClick={make_excel} className='excel-btn'>
                Получить отчёт о будущей выручке по выбранным датам в excel
            </button>
        </div>
    );
};

export default Otchet