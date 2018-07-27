import React from 'react'
import { withRouter } from 'next/router'
import { Navbar, Container, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'

class NavigatorDashboard extends React.Component {
    render() {
        let { router } = this.props

        return (
            <div>
                <Navbar className="shadow" color="light" light>
                    <Container>
                        <NavbarBrand>CEO Dashboard</NavbarBrand>
                        <Nav className="ml-auto">
                            <NavItem>
                                <Button color="light" size="sm" className="shadow rounded mr-4 small" onClick={ () => router.push('/dashboard/ceo') }>Beranda</Button>
                            </NavItem>
                            <NavItem>
                                <Button color="light" size="sm" className="shadow rounded mr-4 small" onClick={ () => router.push('/dashboard/ceo/member') }>Edit Biodata Anggota</Button>
                            </NavItem>
                            <NavItem>
                                <Button size="sm" color="danger" className="shadow" onClick={ () => {
                                    localStorage.removeItem('ceo-uid')
                                    router.push('/login/ceo')
                                } }>Log Out</Button>
                            </NavItem>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(NavigatorDashboard)