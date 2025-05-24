import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import {Layout} from "../layout";
import { Button } from "../components/button/Button";
import '98.css';
import {TabMenuTabs} from "../components/tab-menu/tab-menu-ui";

const IndexPage: React.FC<PageProps> = () => {
  return (
      <Layout selectedTab={TabMenuTabs.Info}>
            Info
      </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
