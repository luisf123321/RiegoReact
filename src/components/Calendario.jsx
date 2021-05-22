import React, { Component, Fragment } from 'react';
import Calendar from 'react-calendar';
import '../Styles/css/calendario.less'
import 'react-calendar/dist/Calendar.css';

class Calendario extends Component{

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    onChange(event){
        const target = event.target;
        const value = target.value;
        this.state.value = value;
        this.setState({value})
    }

    state = {
        value:new Date()
    }

    render(){
        
        return(
            <Fragment>
                <div >
                    
                        <Calendar
                            
                            onChange={this.onChange}
                            showWeekNumbers
                            value={this.state.value}
                            
                        />
                        
                </div>
            </Fragment>
        )
    }

}

export default Calendario;