import React, { useEffect, useState, useMemo } from 'react';
import { Login } from '../services/Login';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Paper, Box, TextField, Button } from '@mui/material';
import { format, eachDayOfInterval, differenceInDays, eachHourOfInterval } from 'date-fns';
import { ru } from 'date-fns/locale';
// import './Graph.css';
import { getUsers } from '../services/userService';

const Users = await getUsers('inactive');

const calculateHours = (start, end) => {
  const startHour = parseInt(start.split(':')[0]);
  const startMin = parseInt(start.split(':')[1]);
  const endHour = parseInt(end.split(':')[0]);
  const endMin = parseInt(end.split(':')[1]);
  
  let hours = endHour - startHour;
  if (endMin > startMin || (endMin > 0 && startMin > 0)) {
    hours += 1; // Округляем в большую сторону
  }
  return hours;
};

const Graph = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date('2025-04-01'));
  const [endDate, setEndDate] = useState(new Date('2025-04-07'));
  const [summa, setSumma] = useState(0);
  
    const calculateRevenue = ()=>{
      const start = new Date(Date.parse(startDate)-8*3600*1000)
      const end = new Date(Date.parse(endDate)-8*3600*1000)
  
      // console.log('start', new Date(Date.parse(start)-8*3600*1000));
      
      
      let ans_arr = []
      let ans = 0
      for (let i = 0; i < Users.length; i++) {
          let t = Users[i].cur_date
          if (t.split('.')[0].length === 1) {
              t = `0${t}`;
          }
          t  = new Date(t.substring(6,10), Number(t.substring(3,5))-1, t.substring(0,2));
  
          // console.log(t>=start && t<=end, t, start, end);
          
  
          if (t>=start && t<=end){
              let hours = Number(Users[i].end_time.substring(0,2))-Number(Users[i].start_time.substring(0,2))
              if (Number(Users[i].end_time.substring(3,5))-Number(Users[i].start_time.substring(3,5))>0){
                  hours++
              }
              ans+=hours*200
              ans_arr.push(Users[i])
          }
          
      }
      setSumma(ans)
      // console.log(ans);
      return ans_arr
      
  }

  useEffect(() => {
    if (!Login(Cookies.get('username'), Cookies.get('password'))) {
      navigate('/');
    }
    calculateRevenue();
  }, [startDate, endDate]);

  const showHours = useMemo(() => {
    const daysDiff = differenceInDays(endDate, startDate);
    return daysDiff <= 7; // Показывать часы для периодов до 7 дней включительно
  }, [startDate, endDate]);

  const hourInterval = useMemo(() => {
    const daysDiff = differenceInDays(endDate, startDate);
    return daysDiff >= 5 ? 6 : 4; // Для 5-7 дней интервал 2 часа, для меньших периодов - 3
  }, [startDate, endDate]);

  const prepareChartData = useMemo(() => {
    if (showHours) {
      const hours = eachHourOfInterval({
        start: new Date(startDate.setHours(8, 0, 0, 0)),
        end: new Date(endDate.setHours(22, 0, 0, 0))
      });

      return hours.map(hour => {
        const hourKey = format(hour, 'HH:mm');
        const dateKey = format(hour, 'dd.MM.yyyy');
        
        let occupied = 0;
        Users.forEach(booking => {
          if (booking.cur_date === dateKey) {
            const bookingStart = parseInt(booking.start_time.split(':')[0]);
            const bookingEnd = parseInt(booking.end_time.split(':')[0]);
            const currentHour = hour.getHours();
            
            if (currentHour >= bookingStart && currentHour < bookingEnd) {
              occupied++;
            }
          }
        });


return {
  time: hourKey,
  date: dateKey,
  fullLabel: `${dateKey} ${hourKey}`,
  occupied
};
});
} else {
const days = eachDayOfInterval({ start: startDate, end: endDate });

return days.map(day => {
const dateKey = format(day, 'dd.MM.yyyy');
let occupiedHours = 0;

Users.forEach(booking => {
  if (booking.cur_date === dateKey) {
    const hours = calculateHours(booking.start_time, booking.end_time);
    occupiedHours += hours;
  }
});

return {
  date: dateKey,
  displayDate: format(day, 'dd MMM'),
  occupied: occupiedHours
};
});
}
}, [startDate, endDate, showHours]);

return (
<div className="graph-container">
<Button 
variant="contained" 
color="primary" 
component={Link} 
to="/main"
sx={{
  position: 'absolute',
  top: 20,
  left: 20,
  zIndex: 1000,
  backgroundColor: '#4a76a8',
  '&:hover': {
    backgroundColor: '#3a6690'
  }
}}
>
На главную
</Button>

<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
<Box sx={{ 
  padding: 3, 
  maxWidth: '100%', 
  margin: '0 auto',
  marginTop: '60px'
}}>
  <Paper elevation={3} sx={{ 
    padding: 3, 
    marginBottom: 3,
    backgroundColor: '#f9f9f9'
  }}>
    <Typography variant="h4" gutterBottom sx={{ 
      color: '#333',
      fontWeight: 'bold',
      marginBottom: '20px'
    }}>
      Выберите период
    </Typography>
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      <DatePicker
        label="Начальная дата"
        value={startDate}
        onChange={(newValue) => setStartDate(newValue)}
        renderInput={(params) => (
          <TextField 
            {...params} 
            sx={{ 
              minWidth: 200,
              backgroundColor: 'white',
              borderRadius: '4px'
            }} 
          />
        )}
      />
      <DatePicker
        label="Конечная дата"
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
        renderInput={(params) => (
          <TextField 
            {...params} 
            sx={{ 
              minWidth: 200,
              backgroundColor: 'white',
              borderRadius: '4px'
            }} 
          />
        )}
        minDate={startDate}
      />
    </Box>
  </Paper>


<Paper elevation={3} sx={{ 
  padding: 3, 
  marginBottom: 3,
  backgroundColor: '#f9f9f9'
}}>
  <Typography variant="h5" gutterBottom sx={{
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '20px'
  }}>
    {showHours ? 'Занятость зала по часам' : 'Занятость зала по дням'}
  </Typography>
  <Box sx={{
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }}>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={prepareChartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis 
          dataKey={showHours ? "time" : "displayDate"} 
          label={{ 
            value: showHours ? 'Часы' : 'Даты', 
            position: 'bottom', 
            offset: 30,
            fill: '#666'
          }}
          angle={showHours ? 0 : -45}
          textAnchor={showHours ? "middle" : "end"}
          height={showHours ? 40 : 60}
          interval={showHours ? hourInterval - 1 : 0} // Интервал в зависимости от периода
          tick={{ fill: '#555' }}
        />
        <YAxis 
          label={{ 
            value: showHours ? 'Занято мест' : 'Часы занятости', 
            angle: -90, 
            position: 'left', 
            offset: 10,
            fill: '#666'
          }}
          tick={{ fill: '#555' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#fff',
            borderRadius: '6px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            border: 'none'
          }}
          formatter={(value) => [showHours 
            ? `${value} мест` 
            : `${value} часов`, 
          'Занятость']}
          labelFormatter={(label) => showHours 
            ? `Время: ${label}` 
            : `Дата: ${label}`}
        />
        <Bar 
          dataKey="occupied" 
          name={showHours ? "Занято мест" : "Часы занятости"} 
          fill="#4a76a8" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </Box>
</Paper>

<Paper elevation={3} sx={{ 
  padding: 2,
  backgroundColor: '#4a76a8',
  color: 'white',
  textAlign: 'right'
}}>
  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
    Итог: {summa.toLocaleString('ru-RU')} рублей ({(summa/200).toFixed(1)} ч.)
  </Typography>
</Paper>
</Box>
</LocalizationProvider>
</div>
);
};

export default Graph;
