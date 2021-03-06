import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Menu from '../Menu'
import Links from '../Links'
import './style.scss'

const sidebar = ({ isHomePage }) => {
  const data = useStaticQuery(graphql`
  query SidebarQuery {
    kontentItemSiteMetadata(system: {codename: {eq: "site_metadata"}}) {
      elements {
        copyright {
          value
        }
        subtitle {
          value
        }
        title {
          value
        }
      }
    }
    kontentItemMenu(system: {codename: {eq: "navigation_menu"}}) {
      elements {
        menu_items {
          value {
            ... on kontent_item_menu_item {
              id
              elements {
                label {
                  value
                }
                path {
                  value
                }
              }
            }
          }
        }
      }
    }
    kontentItemAuthor(system: {codename: {eq: "author"}}) {
      elements {
        bio {
          value
        }
        email {
          value
        }
        github {
          value
        }
        name {
          value
        }
        twitter {
          value
        }
        avatar_image {
          value {
            description
            url
          }
        }
      }
    }
  }
`,
  )

  const author = data.kontentItemAuthor
  const menu = data.kontentItemMenu
  const copyright = data.kontentItemSiteMetadata.elements.copyright.value
  const profilePicUrl = `${data.kontentItemAuthor.elements.avatar_image.value[0].url}?w=225`
  const profilePicAltText = data.kontentItemAuthor.elements.avatar_image.value[0].description

  return (
    <div className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__author">
          <div>
            <Link to="/">
              <img
                src={profilePicUrl}
                className="sidebar__author-photo"
                width="75"
                height="75"
                alt={profilePicAltText}
              />
            </Link>
            {isHomePage ? (
              <h1 className="sidebar__author-title">
                <Link className="sidebar__author-title-link" to="/">
                  {author.elements.name.value}
                </Link>
              </h1>
            ) : (
              <h2 className="sidebar__author-title">
                <Link className="sidebar__author-title-link" to="/">
                  {author.elements.name.value}
                </Link>
              </h2>
            )}
            <p className="sidebar__author-subtitle">
              {author.elements.bio.value}
            </p>
          </div>
        </div>
        <div>
          <Menu data={menu} />
          <Links data={author} />
          <p className="sidebar__copyright">{copyright}</p>
        </div>
      </div>
    </div>
  )
}

export default sidebar
