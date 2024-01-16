import React from "react";


class Addtodo extends React.Component {

    state = {
            title : ''
    }


    handleOnChange = (event) => {
            this.setState(
                {
                    title: event.target.value
                }
            )
    }

    handleOnClick = () => {
       let todo = {
        id: Math.floor(Math.random() *10000 ),
        title: this.state.title
       }

        this.props.addNewTodo(todo);
    }
    render() {

        let  { title} = this.state;
        return (

            <div className="add">
                <input type='text' 
                onChange={(event) => {this.handleOnChange(event)}}/>
                <button type="button" onClick={(event) => { this.handleOnClick(event) }}>add</button>
            </div>

        )
    }

}



export default Addtodo;