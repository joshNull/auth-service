import React from 'react'
import { Route } from 'react-router-dom'
import propTypes from 'prop-types'

function RouteWithLayout(props) {

    const { layout: Layout, component: Component, ...rest } = props;

    return (<Route
        {...rest}
        render={(matchProps) => (
            <Layout>
                <Component {...matchProps} />
            </Layout>
        )}
    />)
}

RouteWithLayout.propTypes = {
    layout: propTypes.any.isRequired,
    component: propTypes.any.isRequired,
    path: propTypes.string
}

export default RouteWithLayout