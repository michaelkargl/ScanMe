import {graphql} from "gatsby";
import React, {useEffect} from "react";
import {ViewerUi} from "../../components/viewer-ui/ViewerUi";

const ViewerPage = ({data}: any) => {
    const markdown = data.allMarkdownRemark.edges[0].node.frontmatter;

    return (<div className='view-page-component'>
       <ViewerUi id={markdown.id} name={markdown.title} content={markdown.mywidget}/>
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
