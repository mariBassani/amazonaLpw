import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendario(){
    const [date, setDate] = useState(new Date());
    return (
        <>
            <div>
                <Calendar
                onChange={setDate}
                value={date}
                />
                <p>Data selecionada: {date.toDateString()}</p>
            </div>
        </>
    )
}

export default Calendario;
