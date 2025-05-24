import React, {useEffect, useState} from "react";
import {ReactElement} from "react";
import './creator.scss';
import {graphql, PageProps} from "gatsby";
import {CreatorUi} from "../components/creator-ui/creator-ui";
import {MarkdownFile} from "../components/shared/models/markdown-file";


function mapToMarkdownFile(markdown: any) {
    const fileName = markdown.node.fileAbsolutePath
        .replace(/^.*[\\|/]/, '') // remove anything but the file name
        .replace(/\..*$/, '');    // remove the extension
    return {
        id: markdown.node.id,
        title: markdown.node.frontmatter.title,
        fileName
    }
}

const CreatorPage: React.FC<PageProps<Queries.ListAllCreatorMarkdownFilesQuery>> = ({data}): ReactElement => {
    const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
    useEffect(() => {
        setMarkdownFiles(data.allMarkdownRemark.edges.map(mapToMarkdownFile));
    }, []);

    return (<div className='creator-page-component'>
        <CreatorUi markdownFiles={markdownFiles}/>
    </div>)
}

export default CreatorPage;

export const query = graphql`
query ListAllCreatorMarkdownFiles {
   allMarkdownRemark {
    edges {
      node {
        id
        fileAbsolutePath
        frontmatter {
          title
        }
      }
    }
  }
}   
`