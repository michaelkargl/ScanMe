import {graphql} from "gatsby";
import React from "react";

const ViewerPage = ({data}: any) => {
    const markdown = data.allMarkdownRemark.edges[0].node.frontmatter;
    return (<div className='view-page-component'>
        <h1>{markdown.title}</h1>
        <ul>
            <li>Content</li>
            <ul>
                <li>{markdown.mywidget}</li>
            </ul>
            <li>
                <pre>
                    {JSON.stringify(markdown, null, 2)}
                </pre>
            </li>
        </ul>
    </div>)
}

export default ViewerPage;
//
export const query = graphql`
query MyQuery($id: String) {
  allMarkdownRemark(filter: {id: {eq: $id}}) {
    edges {
      node {
        frontmatter {
          title
          mywidget
        }
        id
      }
    }
  }
}
`
