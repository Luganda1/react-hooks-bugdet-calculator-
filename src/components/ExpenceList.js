import React from 'react';
import Item from "./ExpenseItem";
import {MdDelete} from "react-icons/md";

export default function ExpenceList({ 
    expences,
    handleDelete,
    handleEdit,
    clearItems
}) {
    return (
        <>
        <ul className="list">
            {
                expences.map((expence) => {
                    return <Item 
                    key={expence.id} 
                    expence={expence} 
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    />
                })
            }
        </ul>
        {
            expences.length > 0 && <button className="btn" onClick={clearItems}>
                Clear expenses
                <MdDelete className="btn-icon" />
            </button>
        }
        </>
    )
}
