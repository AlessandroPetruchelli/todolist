import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {CreateItemForm} from "./CreateItemForm.tsx";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

type TaskStateType = {
    [key: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {


    const todolistId_1 = v1();
    const todolistId_2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const removeTodolist = (todolistId: string)=>{
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }

    const createTodolist = ( newTitle: string)=>{
        const todolistId = v1()
        const newTodolist: TodolistType = {
            id: todolistId,
            title: newTitle,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [todolistId]: []})
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))
    }



    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
        ],
    })

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(filtered => filtered.id === todolistId ? {...filtered, filter} : filtered))
    }


    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }


    const createTask = (todolistId: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title}: task)})
    }

    return (
        <div className="app">
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map(tl => {
                    let filteredTasks = tasks[tl.id]
                    if (tl.filter === 'active') {
                        filteredTasks = tasks[tl.id].filter(task => !task.isDone)
                    }
                    if (tl.filter === 'completed') {
                        filteredTasks = tasks[tl.id].filter(task => task.isDone)
                    }
                    return (
                        <TodolistItem
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={filteredTasks}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            createTask={createTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    )
                }
            )}
        </div>
    )
}
