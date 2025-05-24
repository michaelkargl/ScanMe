import {Layout} from "../../layout";
import {TabMenuTabs} from "../../components/tab-menu/tab-menu-ui";
import React from "react";

const ViewerIndexPage: React.FC = () => {
    return (<div className='viewer-index-page-component'>
        <Layout selectedTab={TabMenuTabs.Viewer}>
            <p>
                To use the viewer scan a QR code with the scanner.
            </p>
        </Layout>
    </div>)
}

export default ViewerIndexPage;