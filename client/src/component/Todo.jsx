import { useEffect } from "react";
import { useState } from "react"
import { BASE_URL } from "../utils/constant";

const Todo = () => {

    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("")

    const addTodo = async () => {
        try {

            const user = localStorage["user_token"];
            const {
                name,
                token
            } = JSON.parse(user);

            const res = await fetch(BASE_URL + "api/todo/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ title: todo, author: token })
            })
            fetchTodo()
        } catch (err) {
            console.log(err)
        }
    }


    const fetchTodo = async () => {
        try {
        const user = localStorage["user_token"];
        console.log(user)
        const {
            token
        } = JSON.parse(user);
        const res = await fetch(BASE_URL + "api/todo", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })

        const data = await res.json()
        console.log(data,"listkkkkkkkkkkkkkk")
        setTodoList(data.todos)
    } catch (err) {
        console.log(err)
    }
    }

    useEffect(()=>{
      fetchTodo()
    },[])

    console.log(todoList,"todoList")

    return (
        <>
            <h2>Add Todo</h2>
            <input onChange={(e) => setTodo(e.target.value)} value={todo} />
            <button onClick={addTodo} type="submit" >Add TODO</button>

            <h2>List of Todo</h2>
            {
                todoList.length != 0 ?

                    todoList.map((ele) => (
                        <div key={ele.id}>
                            <div>{ele.title}</div>
                            <div>{ele.description}</div>
                            <div>delete</div>
                        </div>
                    ))
                    : <h3>No todo created yet!!</h3>

            }
        </>
    )
}

export default Todo;