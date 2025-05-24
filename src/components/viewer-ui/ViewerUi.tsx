import React from "react";
import {Remark} from "react-remark";
import {Layout} from "../../layout";
import {TabMenuTabs} from "../tab-menu/tab-menu-ui";

export interface ViewerUiProps {
    id: string,
    name: string,
    content: string
}

export const ViewerUi: React.FC<ViewerUiProps> = (props) => {
    return (<div className="viewer-ui-component">
        <Layout selectedTab={TabMenuTabs.Viewer}>
            <h1>{props.name}</h1>
            <small>{props.id}</small>

            <hr/>

            <Remark>{props.content}</Remark>

            <hr/>

            <pre>
            {JSON.stringify(props, null, 2)}
        </pre>
        </Layout>
    </div>)
}