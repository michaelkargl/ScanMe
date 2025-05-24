import React, {PropsWithChildren, ReactElement} from "react";
import {Link} from "gatsby";

export enum TabMenuTabs {
    Info = 0,
    Scanner = 1,
    Creator = 2,
    Viewer = 3,
}

type TabMenuItemProps = PropsWithChildren<{
    selectedTab: number,
    infoLink: string,
    scannerLink: string,
    creatorLink: string,
    viewerLink: string
}>

export const TabMenuUi: React.FC<TabMenuItemProps> = (props): ReactElement => {
    return (<div className='tab-menu-ui-component'>
        <fieldset>
            <menu role="tablist">
                <li role="tab" aria-selected={props.selectedTab === TabMenuTabs.Info}>
                    <Link to={props.infoLink}>Info</Link></li>
                <li role="tab" aria-selected={props.selectedTab === TabMenuTabs.Scanner}><Link
                    to={props.scannerLink}>Scanner</Link></li>
                <li role="tab" aria-selected={props.selectedTab === TabMenuTabs.Creator}><Link
                    to={props.creatorLink}>Creator</Link></li>
                <li role="tab" aria-selected={props.selectedTab === TabMenuTabs.Viewer}><Link
                    to={props.viewerLink}>Viewer</Link></li>
            </menu>
            <div className='window' role='tabpanel'>
                <div className='window-body'>
                    {props.children}
                </div>
            </div>
        </fieldset>
    </div>)
}