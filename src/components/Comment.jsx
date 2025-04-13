        import { Button } from '@mui/material';
import axios from 'axios';
        import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

        const Comment = () => {

            const [reviews , Setreviews] = useState([]);
            

            useEffect(()=>{
                axios.get('http://100.73.29.190:5000/comms').then(e=>Setreviews(e.data))
            }, [])

            // const [reviews] = useState([
            //     { id: 1, author: 'Алексей', text: 'Отличный продукт! Пользуюсь уже месяц, всё работает прекрасно.', rating: 5, date: '2023-05-15' },
            //     { id: 2, author: 'Мария', text: 'Неплохо, но есть небольшие недочёты в дизайне.', rating: 4, date: '2023-05-10' },
            //     { id: 3, author: 'Иван', text: 'Ожидал большего за эти деньги. Качество среднее.', rating: 3, date: '2023-04-28' },
            //     { id: 4, author: 'Елена', text: 'Очень довольна покупкой, рекомендую!', rating: 5, date: '2023-04-20' },
            //     { id: 5, author: 'Дмитрий', text: 'Не соответствует описанию, разочарован.', rating: 2, date: '2023-04-15' },
            //   ]);
            
            const [filterRating, setFilterRating] = useState('all');
            
            const filteredReviews = filterRating === 'all' 
                ? reviews 
                : reviews.filter(review => review.score === parseInt(filterRating));

            return(
                <div className="reviews-container">
            <Button 
    variant="contained" 
    color="primary" 
    component={Link} 
    to="/main"
    sx={{
    backgroundColor: '#4a76a8',
    '&:hover': {
        backgroundColor: '#3a6690'
    }
    }}
    >
    На главную
    </Button>
            <h1>Отзывы о рабочих местах</h1>
            
            <div className="reviews-filter">
                <label>Фильтр по оценке: </label>
                <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                >
                <option value="all">Все отзывы ({reviews.length})</option>
                <option value="5">5 ★ ({reviews.filter(r => r.score === 5).length})</option>
                <option value="4">4 ★ ({reviews.filter(r => r.score === 4).length})</option>
                <option value="3">3 ★ ({reviews.filter(r => r.score === 3).length})</option>
                <option value="2">2 ★ ({reviews.filter(r => r.score === 2).length})</option>
                <option value="1">1 ★ ({reviews.filter(r => r.score === 1).length})</option>
                </select>
            </div>
            
            <div className="reviews-list">
                {filteredReviews.length > 0 ? (
                filteredReviews.map(review => (
                    <div key={review.id} className="review-card">
                    <div className="review-header">
                        <h3>{review.username}</h3>
                        <div className="review-rating">
                        {'★'.repeat(review.score)}{'☆'.repeat(5 - review.score)}
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <span className="review-date">{`${review.cur_date} ${review.cur_time}`}</span>
                            <span>Место: {review.place}</span>
                        </div>
                    </div>
                    <p className="review-text">{review.txt}</p>
                    </div>
                ))
                ) : (
                <p className="no-reviews">Нет отзывов с выбранным фильтром</p>
                )}
            </div>
            </div>
            );
        };

        export default Comment