import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type CreateItemForm = {
    onCreateItem: (newTitle: string) => void;
};


export const CreateItemForm = ({onCreateItem}: CreateItemForm) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    const createItemHandler = () => {
        const trimmedTitle = newTitle.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={newTitle}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}/>
            <Button title={'+'} onClick={createItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};