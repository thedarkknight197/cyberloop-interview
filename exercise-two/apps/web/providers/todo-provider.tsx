'use client';

import {Provider} from "jotai";
import {store} from "@repo/store/todo";

export function TodosProvider({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<Provider store={store}>
        {children}
    </Provider>)
}
