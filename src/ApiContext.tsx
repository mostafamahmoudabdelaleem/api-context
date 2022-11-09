import React, { createContext, useReducer, useContext, PropsWithChildren } from 'react';
import axios from 'axios'
import { PopupContext } from './PopupContext';
import moment from 'moment'


type APIContextStateType = {
    API_URL: string,
    API_KEY: string,
    TOKEN: string,
    REQUEST_TIMEOUT: number
}
type APIContextActionType = {
    type: 'UPDATE_TOKEN' | 'INITIALIZE',
    payload?: any,
    extra?: any
}
type APIContextRequestType = {
    path: string,
    body?: Object,
    headers?: Object,
    showLoader?: boolean
}
type APIContextType = {
    State: APIContextStateType,
    Dispatcher: React.Dispatch<APIContextActionType>,
    Post: (APIContextRequest: APIContextRequestType) => Promise<any>,
    Get: (APIContextRequest: APIContextRequestType) => Promise<any>
}
const initState: APIContextStateType = {
    API_URL: '',
    API_KEY: '',
    TOKEN: '',
    REQUEST_TIMEOUT: 15000
}




export const APIContext = createContext<APIContextType>({
    State: initState,
    Dispatcher: (_: APIContextActionType) => { },
    Post: () => { return new Promise(resolve => resolve('Done')) },
    Get: () => { return new Promise(resolve => resolve('Done')) }
});
const APIReducer = (state: APIContextStateType, action: APIContextActionType) => {
    switch (action.type) {
        case 'INITIALIZE': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'UPDATE_TOKEN': {
            return {
                ...state,
                TOKEN: action.payload
            }
        }
        default:
            return state
    }
};

const APIProvider: React.FC<PropsWithChildren<{ BaseURL?: string; }>> = ({ children, BaseURL }) => {
    const { ToggleLoader } = useContext(PopupContext)
    const [state, dispatch] = useReducer(
        APIReducer,
        { ...initState, API_URL: BaseURL }
    );


    const postCall = ({ path, body = {}, headers, showLoader = true }: APIContextRequestType): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const _headers: any = {
                ...headers,
                token: state.TOKEN,
                apikey: state.API_KEY
            }

            // console.log('[postCall API Request URL]:', state.API_URL + path)
            // console.log('[postCall API Request Body]:', _body)
            // console.log('[postCall API Request Headers]:', _headers)

            const _axios = axios.create({
                baseURL: state.API_URL,
                headers: _headers,
                timeout: state.REQUEST_TIMEOUT
            });

            let st = Date.now()
            try {
                if (showLoader) {
                    ToggleLoader('show')
                }
                let resp = await _axios.post(path, body)
                ToggleLoader('hide')
                let time = Date.now() - st;
                let formatedTime = moment(moment.utc(time)).format(time > (60 * 1000) ? 'mm:ss SSS' : 'ss.SSS')
                ValidateResponse(resp, path, formatedTime, resolve, reject)
            } catch (err) {
                ToggleLoader('hide')
                let time = Date.now() - st;
                let formatedTime = moment(moment.utc(time)).format(time > (60 * 1000) ? 'mm:ss SSS' : 'ss.SSS')
                ValidateResponse(err, path, formatedTime, resolve, reject)
            }
        })
    }

    const getCall = ({ path, body = {}, headers, showLoader = true }: APIContextRequestType): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const _headers: any = {
                ...headers,
                token: state.TOKEN,
                apikey: state.API_KEY
            }

            // console.log('[postCall API Request URL]:', state.API_URL + path)
            // console.log('[postCall API Request Body]:', _body)
            // console.log('[postCall API Request Headers]:', _headers)

            const _axios = axios.create({
                baseURL: state.API_URL,
                headers: _headers,
                timeout: state.REQUEST_TIMEOUT
            });

            let st = Date.now()
            try {
                if (showLoader) {
                    ToggleLoader('show')
                }
                let resp = await _axios.get(path, body)
                ToggleLoader('hide')
                let time = Date.now() - st;
                let formatedTime = moment(moment.utc(time)).format(time > (60 * 1000) ? 'mm:ss SSS' : 'ss.SSS')
                ValidateResponse(resp, path, formatedTime, resolve, reject)
            } catch (err) {
                ToggleLoader('hide')
                let time = Date.now() - st;
                let formatedTime = moment(moment.utc(time)).format(time > (60 * 1000) ? 'mm:ss SSS' : 'ss.SSS')
                ValidateResponse(err, path, formatedTime, resolve, reject)
            }
        })
    }

    // Validation Checks Methods
    const ValidateResponse = (
        resp: any,
        path = '',
        time = '',
        callback = (_: any) => { },
        fallback = (_: any) => { }
    ) => {
        if (resp.status === 200 || resp.status === 201) {
            console.log(`[ValidateResponse URL - Status - Time] => ${resp.request.responseURL} - ${resp.request.status} - ${time}`)
            callback(resp.data)
        }
        else {
            if (resp.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(`[ValidateResponse URL - Status] => ${state.API_URL}/${path} - ${resp.response.status}`)
                // console.log(`[ValidateResponse Error] => ${resp}`)
                fallback(resp.response)
            } else if (resp.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(`[ValidateResponse URL - Status] => ${state.API_URL}/${path} - ${resp.request.status}`)
                // console.log(`[ValidateResponse Error] => ${resp.request._response}`)
                fallback(resp.request)
            } else {
                console.log(`[ValidateResponse Error] => ${resp}`)
                fallback(resp)
            }
        }
    }

    return (
        <APIContext.Provider value={{
            State: state,
            Post: postCall,
            Get: getCall,
            Dispatcher: dispatch
        }}>
            {children}
        </APIContext.Provider >
    )
}

export default APIProvider;