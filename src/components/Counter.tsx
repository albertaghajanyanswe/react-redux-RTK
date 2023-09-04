import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { counterSlice } from '../store/reducers/CounterSlice';
import { userSlice } from '../store/reducers/UsersSlice';

function Counter() {

  const { increment, decrement } = counterSlice.actions;
  const dispatch = useAppDispatch();
  const { count } = useAppSelector(state => state.counterReducer);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px'}}>
      <h1> Counter store </h1>
      <div style={{ display: 'flex' }}>
        <button onClick={() => dispatch(decrement(1))}>Decrement</button>
        <h2 style={{ margin: '0 32px' }}>{count}</h2>
        <button onClick={() => dispatch(increment(1))}>Increment</button>
      </div>
    </div>
  )
}

export default Counter;