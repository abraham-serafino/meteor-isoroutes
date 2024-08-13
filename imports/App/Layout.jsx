import React from 'react'

function Layout({ title, children }) {
    return (
        <div>
            <h1>{title}</h1>

            <div><a href="/counter">Counter</a></div>
            <div><a href="/character">Character</a></div>
            <div />
            {children}
        </div>
    )
}

export default Layout
