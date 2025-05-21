import React, {PropsWithChildren, ReactElement} from "react";
import {Link} from "gatsby";


type TabMenuItemProps = PropsWithChildren<{
    infoLink: string,
    scannerLink: string,
    creatorLink: string
}>

export const TabMenuUi: React.FC<TabMenuItemProps> = (props): ReactElement => {
    return (<div className='tab-menu-ui-component'>
        <fieldset>
            <menu role="tablist">
                <li role="tab" aria-selected="false"><Link to={props.infoLink}>Info</Link></li>
                <li role="tab" aria-selected="false"><Link to={props.scannerLink}>Scanner</Link></li>
                <li role="tab" aria-selected="false"><Link to={props.creatorLink}>Creator</Link></li>
            </menu>
            <div className='window' role='tabpanel'>
                <div className='window-body'>
                    {props.children}
                </div>
            </div>
        </fieldset>
    </div>)
}