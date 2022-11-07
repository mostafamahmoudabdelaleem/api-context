import React, { type PropsWithChildren } from 'react'
import APIProvider from './ApiContext'
import PopupProvider from './PopupContext'

const APIContextProvider: React.FC<PropsWithChildren<{ BaseURL: string; }>> = ({ children, BaseURL }) => {
    return (
        <PopupProvider>
            <APIProvider BaseURL={BaseURL}>
                {children}
            </APIProvider>
        </PopupProvider>
    )
}

export default APIContextProvider