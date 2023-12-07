import React from "react";
import './ListoDo.scss'
import Addtodo from "./Addtodo.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class ListoDo extends React.Component {

    state = {
        listTodos: [
            { id: '1', title: 'Doing homewworradasd' },
            { id: '1', title: 'Doing homewworradasd' },
            { id: '1', title: 'Doing homewworradasd' }
        ]
    }


    addNewTodo = (todo) => {
        this.setState ( {
            listTodos : [...this.state.listTodos, todo]
        })
        toast.success("Wow so easy!");
    }


    render() {

        let {listTodos} = this.state;

        return (
            <div className="Todo-Container">
                <Addtodo addNewTodo={this.addNewTodo} />
              
                <div className="listodo-content">
                    {listTodos && listTodos.length > 0 && listTodos.map((item, index)=> {
                        return (
                            <div className="listodo-child" key={item.id}>
                                <span> {index+1} - {item.title}</span>
                                <button type="button">edit</button>
                                <button type="button">delete</button>
                            </div>
                        )
                    })}

                    
                </div>

            </div>
        )
    }


}


export default ListoDo;