import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import propTypes from 'prop-types'
import { AppContext } from '../../context'

function PublicPage(props) {
    const { layout: Layout, component: Component, ...rest } = props
    const [{ authenticated }, setApp] = useContext(AppContext)

    return (<Route
        {...rest}
        render={(matchProps) => !authenticated ? (
            <div>
                <Layout>
                    <Component {...matchProps} />
                </Layout>
            </div>
        ) :
            (<Redirect to="/user" />)
        }
    />)
}

PublicPage.propTypes = {
    layout: propTypes.any.isRequired,
    component: propTypes.any.isRequired,
    path: propTypes.string
}

export default PublicPage