import {type ChangeEvent} from 'react'
import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";


type Props = {
    todolistId: string
    title: string
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValues
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        title,
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        filter,
        todolistId,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const onCreateItemHandler = (newTitle: string) => {
        createTask(todolistId, newTitle)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle)
    }

    return (
        <div>
            <div className="titleWrapper">
                {/*<h3>{title}</h3>*/}
                <EditableSpan title={title} onChange={changeTodolistTitleHandler}/>
                <Button onClick={removeTodolistHandler} title={'x'}/>
            </div>
            <CreateItemForm onCreateItem={onCreateItemHandler}/>
            {!tasks.length ? (
                <p>no tasks</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(todolistId, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(todolistId, task.id, newStatusValue)
                        }
                        const changeTaskTitleHandler = (newTitle: string) => {
                            changeTaskTitle(todolistId, task.id, newTitle)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilter(todolistId, 'all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilter(todolistId, 'active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilter(todolistId, 'completed')}/>
            </div>
        </div>
    )
}
