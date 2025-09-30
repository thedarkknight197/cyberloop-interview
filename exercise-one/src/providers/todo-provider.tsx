'use client';

import {store} from "@/store/todo";
import {Provider} from "jotai";

export function TodosProvider({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<Provider store={store}>
        {children}
    </Provider>)
}
