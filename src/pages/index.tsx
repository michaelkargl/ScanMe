import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import {Layout} from "../layout";
import { Button } from "../components/button/Button";
import '98.css';

const IndexPage: React.FC<PageProps> = () => {
  return (
      <Layout>
        <Button>98 Button</Button>
      </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
