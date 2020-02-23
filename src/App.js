import React, { useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css'

import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import paths, { titles } from 'routes/paths'
import { Container } from 'react-bootstrap'

function App({ children, location }) {
    const changeTitle = path => {
        let title = titles[path] || 'Delivery Management'
        document.title = title
    }

    useEffect(() => {
        changeTitle(location.pathname)
    }, [location.pathname])

    return (
        <>
            <StyledHead>
                <Container>
                    <Link to={paths.delivery.list}>
                        <i className="fas fa-truck mr-1"></i> <b>Delivery</b>
                    </Link>
                </Container>
            </StyledHead>
            <Container>{children}</Container>
            <ToastContainer />
        </>
    )
}

export default App

const StyledHead = styled.div`
    padding: 15px 0;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    font-size: 1.5rem;

    a {
        color: #333;
        text-decoration: none;
    }
`
