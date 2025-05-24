import type {GatsbyConfig} from "gatsby";

const config: GatsbyConfig = {
    pathPrefix: `/ScanMe`,
    siteMetadata: {
        title: `ScanMe`,
        siteUrl: `https://www.yourdomain.tld`
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        'gatsby-plugin-sass',
        `gatsby-plugin-sharp`,
        {
            resolve: 'gatsby-plugin-decap-cms',
            options: {
                /**
                 * One convention is to place your Decap CMS customization code in a
                 * `src/cms` directory.
                 */
                modulePath: `${__dirname}/src/cms/cms.js`,
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-relative-images-v2`,
                        options: {
                            staticFolderName: 'static',
                        }
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "src/images/icon.png"
            }
        }, "gatsby-plugin-mdx", {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": "./src/cms/"
            },
            __key: "pages"
        }
    ]
};

export default config;
