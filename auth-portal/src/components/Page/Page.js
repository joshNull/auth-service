import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import propTypes from 'prop-types'
import { AppContext } from '../../context'


function Page(props) {
    const { layout: Layout, component: Component, isLoggedIn: isLoggedIn = true, ...rest } = props
    const [{ authenticated }, setApp] = useContext(AppContext)

    return (<Route
        {...rest}
        render={(matchProps) => {
            if (authenticated == isLoggedIn) {
                return (
                    <div>
                        <Layout>
                            <Component {...matchProps} />
                        </Layout>
                    </div>
                )
            } else {
                return isLoggedIn ? (<Redirect to="/login" />) : (<Redirect to="/user" />)
            }
        }}
    />)
}

Page.propTypes = {
    layout: propTypes.any.isRequired,
    component: propTypes.any.isRequired,
    path: propTypes.string
}

export default Page