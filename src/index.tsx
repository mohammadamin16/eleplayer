import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';
import {configureStore, createStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {mainReducer,} from "./store";


const root = createRoot(document.getElementById('root'));


export const makeStore = () => configureStore({
    reducer: {
        main: mainReducer,
    },
})

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>


root.render(
    <Provider store={makeStore()}>
        <App/>
    </Provider>
);