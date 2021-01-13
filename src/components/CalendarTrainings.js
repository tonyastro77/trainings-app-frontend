import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer  } from "react-big-calendar";
import moment from "moment";
import trainingService from '../services/trainings'
import "../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function CalendarTrainings() {
    const [trainings, setTrainings] = useState([])
    const [events, setEvents] = useState([])

    const fetchData = () => {
        trainingService
          .getAll()
          .then(response => {
            let evts = response;
            for(let i = 0; i < evts.length; i++){
                evts[i].start = moment(evts[i].date).toDate();
                evts[i].end = moment(evts[i].date).add(parseInt(evts[i].duration), "minutes")
                evts[i].title = evts[i].activity;
                trainings.concat(evts[i])
            }
            setTrainings(evts)
          })
    }

    useEffect(() => {
        fetchData()
    }, []);

    const localizer = momentLocalizer(moment)

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        <i class="calendar alternate outline icon"></i>
                        Calendar
                    </Typography>
                </Toolbar>
            </AppBar>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={trainings}
                style={{ height: "50vh" }}
            />
        </div>
    )
}

export default CalendarTrainings
