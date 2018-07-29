import React from 'react'
import { withRouter } from 'next/router'
import { Navbar, Container, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'
import { database } from '../../firebase'

class NavigatorDashboard extends React.Component {
    state = {
        leaderExist: '',
        member1Exist: '',
        payed: ''
    }
    
    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('ceo-uid')

            database.ref('pesertaCEO/'+uid).child('leaderExist').once('value')
            .then((leaderExist) => {
                database.ref('pesertaCEO/'+uid).child('member1Exist').once('value')
                .then((member1Exist) => {
                    database.ref('pesertaCEO/'+uid).child('payed').once('value')
                    .then((payed) => this.setState({ leaderExist: leaderExist.val(), member1Exist: member1Exist.val(), payed: payed.val() }))
                })
            })
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }
    
    render() {
        let { router } = this.props
        let { leaderExist, member1Exist, payed } = this.state

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
                                <Button color="light" size="sm" className="shadow rounded mr-4 small" onClick={ () => router.push('/dashboard/ceo/member') } disabled={ leaderExist && member1Exist && payed }>
                                { (leaderExist && member1Exist && payed && "Biodata sudah dikunci") || "Edit Biodata anggota" }
                                </Button>
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