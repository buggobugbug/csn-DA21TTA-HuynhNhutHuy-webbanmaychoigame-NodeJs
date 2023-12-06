import React from "react";

class Addcomponents extends React.Component {
    state = {
        id: '',
        title : '',
        salary : ''

    }
  
    handleChangeTitleJob = (event) => {
        this.setState(
            {
                title: event.target.value
            }
        )
    }

    handleChangeSalary = (event) => {
        this.setState(
            {
                salary: event.target.value
            }
        )
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(!this.state.title || !this.state.salary)
        {
            alert('Missing require params')
            return;
        }
        console.log('>>> check data input: ', this.state)
        this.props.addnewJob({
            id: Math.floor(Math.random() *1001),
            title: this.state.title,
            salary: this.state.salary
        })
        this.setState({
            title:'',
            salary:''
        })
    }




render () {
    return (
        <>
            <form>
                <label htmlFor="title">Job title</label><br />
                <input
                    type="text"
                    value={this.state.title}
                    onChange={(event) => this.handleChangeTitleJob(event)}
                /><br />
                <label htmlFor="salary">Salary: </label><br />
                <input
                    type="text"
                    value={this.state.salary}
                    onChange={(event) => this.handleChangeSalary(event)} /><br /><br />
                <input type="submit" value="Submit" onClick={(event) => this.handleSubmit(event)} />
            </form>
        </>
    )
        
    
} 
}

export default Addcomponents;