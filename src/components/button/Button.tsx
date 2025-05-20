import React, {PropsWithChildren, ReactElement} from 'react';
import '98.css';

export type ButtonProps = PropsWithChildren<{
    onClick?: () => void;
}>;

export const Button: React.FC<ButtonProps> = (props): ReactElement => {
    return (
        <button type="button" onClick={props.onClick}>
            {props.children}
        </button>
    );
};
