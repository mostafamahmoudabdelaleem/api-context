import React, { createContext, useReducer } from 'react';
import LoaderPopup from './LoaderPopup';

type PopupContextStateType = {
  loaderVisible: boolean;
  backgroundColor: string;
};
type PopupContextActionType = {
  type: 'TOGGLE_LOADER' | 'HIDE_LOADER' | 'SHOW_LOADER';
  payload?: any;
};
type PopupContextType = {
  State: PopupContextStateType;
  ToggleLoader: (
    type: 'toggle' | 'show' | 'hide',
    backgroundColor?: string
  ) => void;
};

const initalState: PopupContextStateType = {
  loaderVisible: false,
  backgroundColor: 'rgba(0,0,0,.7)',
};
export const PopupContext = createContext<PopupContextType>({
  State: initalState,
  ToggleLoader: (_p1, _p2) => {},
});

const PopupReducer = (
  state: PopupContextStateType,
  action: PopupContextActionType
) => {
  switch (action.type) {
    case 'TOGGLE_LOADER':
      return {
        ...state,
        loaderVisible: !state.loaderVisible,
        backgroundcolor: action.payload,
      };
    case 'HIDE_LOADER':
      return {
        ...state,
        loaderVisible: false,
      };
    case 'SHOW_LOADER':
      return {
        ...state,
        loaderVisible: true,
      };
    default:
      return state;
  }
};

const PopupProvider = ({
  children,
  customLoader,
}: {
  children: React.ReactNode;
  customLoader: React.ReactNode | null;
}) => {
  const [state, dispatch] = useReducer(PopupReducer, initalState);

  const hideLoader = () => {
    dispatch({
      type: 'HIDE_LOADER',
    });
  };

  const showLoader = () => {
    dispatch({
      type: 'SHOW_LOADER',
    });
  };

  const _toggleLoader = (
    type: 'toggle' | 'show' | 'hide' = 'toggle',
    backgroundColor: string = 'rgba(0,0,0,.7)'
  ) => {
    if (type === 'show') {
      showLoader();
    } else if (type === 'hide') {
      hideLoader();
    } else {
      dispatch({
        type: 'TOGGLE_LOADER',
        payload: backgroundColor,
      });
    }
  };

  return (
    <PopupContext.Provider
      value={{
        State: state,
        ToggleLoader: _toggleLoader,
      }}
    >
      {children}
      <LoaderPopup
        visible={state.loaderVisible}
        backgroundColor={state.backgroundColor}
        size={50}
        customLoader={customLoader}
      />
    </PopupContext.Provider>
  );
};

export default PopupProvider;
