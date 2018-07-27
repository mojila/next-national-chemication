import React from 'react'
import Head from 'next/head'
import { Container } from 'reactstrap'
import LoginCeo from '../../components/login-ceo'
import Router from 'next/router'

class CEO extends React.Component {
    componentDidMount() {
        let uid = localStorage.getItem('ceo-uid')

        if (uid) {
            if (Router) {
                Router.push('/dashboard/ceo')
            }
        }
    }
    
    render() {
        return (
            <div>
                <Head>
                    <title>Login CEO</title>
                </Head>
                <Container className="pt-md-5">
                    <LoginCeo/>
                </Container>
            </div>
        )
    }
}

export default CEO