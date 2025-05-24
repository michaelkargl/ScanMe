import React, {PropsWithChildren} from "react";
import './layout.scss';
import '98.css';
import {TabMenuUi} from "./components/tab-menu/tab-menu-ui";

export type LayoutProps = PropsWithChildren<{
    selectedTab: number
}>;

export const Layout: React.FC<LayoutProps> = (props) => {
    return (<div className="layout-component">
        <div className='window'>
            <div className="title-bar">
                <span className="title-bar-text">My Title</span>
            </div>
            <div className="window-body flex">
                <div className="layout-component__content">
                    <TabMenuUi
                        selectedTab={props.selectedTab}
                        infoLink='/'
                        scannerLink='/scanner'
                        creatorLink='/creator'
                        viewerLink='/viewer'>
                        {props.children}
                    </TabMenuUi>
                </div>
            </div>
        </div>
    </div>);
}