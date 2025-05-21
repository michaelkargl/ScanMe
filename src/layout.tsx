import React, {PropsWithChildren} from "react";
import './layout.scss';
import '98.css';
import {Link} from "gatsby";
import {TabMenuUi} from "./components/tab-menu/tab-menu-ui";

export const Layout: React.FC<PropsWithChildren<{}>> = (props) => {
    return (<div className="layout-component">
        <div className='window'>
            <div className="title-bar">
                <span className="title-bar-text">My Title</span>
            </div>
            <div className="window-body flex">
                <div className="layout-component__sidebar">
                    <TabMenuUi infoLink='/' scannerLink='/scanner' creatorLink='/creator'>
                        {props.children}
                    </TabMenuUi>
                </div>
            </div>
        </div>
    </div>);
}