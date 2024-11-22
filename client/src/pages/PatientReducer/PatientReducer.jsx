import React, { useReducer } from 'react';


const PatientReducer = () => {

    const initialState = {
        count: 0,
        items: [],
        user: { name: '', age: 0 }
    };
    
    const reducer = (state, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return { ...state, count: state.count + 1 };
            case 'DECREMENT':
                return { ...state, count: state.count - 1 };
            case 'ADD_ITEM':
                return { ...state, items: [...state.items, action.payload] };
            case 'REMOVE_ITEM':
                return { ...state, items: state.items.filter((_, index) => index !== action.payload) };
            case 'UPDATE_USER':
                return { ...state, user: { ...state.user, ...action.payload } };
            default:
                return state;
        }
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (index) => {
        dispatch({ type: 'REMOVE_ITEM', payload: index });
    };

    const updateUser = (newUser) => {
        dispatch({ type: 'UPDATE_USER', payload: newUser });
    };

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>

            <h2>Items:</h2>
            <ul>
                {state.items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addItem(`Item ${state.items.length + 1}`)}>Add Item</button>

            <h2>User:</h2>
            <p>Name: {state.user.name}</p>
            <p>Age: {state.user.age}</p>
            <div>
                <label>Name: </label>
                <input type="text" value={state.user.name} onChange={(e) => updateUser({ name: e.target.value })} />
            </div>
            <div>
                <label>Age: </label>
                <input type="number" value={state.user.age} onChange={(e) => updateUser({ age: parseInt(e.target.value) || 0 })} />
            </div>
        </div>
    );
};

export default PatientReducer;
