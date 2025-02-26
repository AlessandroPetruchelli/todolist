import {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    title: string
    onChange: (newTitle: string)=>void;
};
export const EditableSpan = ({title, onChange}: EditableSpanProps) => {
    const [isEditable, setIsEditable] = useState(false);
    const [newEditTitle, setNewEditTitle] = useState(title);

    const turnOnEditMode  = ()=>{
        setIsEditable(true);
    }

    const turnOffEditMode  = ()=>{
        setIsEditable(false)
        onChange(newEditTitle);
    }

    const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewEditTitle(e.currentTarget.value)
    }

    return (
        <>
            {isEditable
                ? <input onChange={onChangeEditHandler} value={newEditTitle} autoFocus onBlur={turnOffEditMode}/>
                : <span onDoubleClick={turnOnEditMode }>{title}</span>
            }
        </>
    )
};