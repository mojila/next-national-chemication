import React from 'react'
import { withRouter } from 'next/router'
import NavigatorDashboard from '../navigator-dashboard-ceo'
import { Container, Row, Col, Button } from 'reactstrap'
import ReactLoading from 'react-loading'
import { database } from '../../firebase'

class MemberCEO extends React.Component {
    state = {
        loading: false,
        leaderExist: '',
        member1Exist: '',
        member2Exist: ''
    }
    
    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('ceo-uid')

            this.setState({ loading: true })

            database.ref('pesertaCEO/'+uid).child('leaderExist').once('value')
                .then((leaderExist) => {
                    database.ref('pesertaCEO/'+uid).child('member1Exist').once('value')
                        .then((member1Exist) => {
                            database.ref('pesertaCEO/'+uid).child('member2Exist').once('value')
                                .then((member2Exist) => {
                                    this.setState({ leaderExist: leaderExist.val(), member1Exist: member1Exist.val(), member2Exist: member2Exist.val(), loading: false })
                                })
                        })
                })
            // let leaderExistFetch = database.ref('pesertaCEO/' + uid).child('leaderExist')
            // let member1ExistFetch = database.ref('pesertaCEO/' + uid).child('member1Exist')
            // let member2ExistFetch = database.ref('pesertaCEO/' + uid).child('member2Exist')

            // this.setState({ loading: true })

            // leaderExistFetch.once('value').then((leaderExist) => {
            //     if (leaderExist.val()) {
            //         this.setState({ leaderExist: leaderExist.val() })
            //     } else {
            //         this.setState({ leaderExist: false })
            //     }
            // })

            // member1ExistFetch.once('value').then((member1Exist) => {
            //     if (member1Exist.val()) {
            //         this.setState({ member1Exist: member1Exist.val() })
            //     } else {
            //         this.setState({ member1Exist: false })
            //     }
            // })

            // member2ExistFetch.once('value').then((member2Exist) => {
            //     if (member2Exist.val()) {
            //         this.setState({ member2Exist: member2Exist.val() })
            //     } else {
            //         this.setState({ member2Exist: false, loading: false })
            //     }
            // })
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        let { loading, leaderExist, member1Exist, member2Exist } = this.state
        let { router } = this.props

        return (
            <div>
                <NavigatorDashboard/>
                <Container className="pt-5">
                    { loading && <ReactLoading className="mx-auto pt-5" width={ 64 } height={ 64 } type="spin" color="green" /> }
                    { !loading && 
                        <div>
                            <Row className={ "p-3 shadow rounded text-white mb-2 " + (leaderExist ? "bg-success":"bg-danger") }>
                                <Col>
                                    { leaderExist
                                    ? <p className="small m-0 p-0">Sudah Mengisi Data Ketua</p>
                                    : <p className="small m-0 p-0">Belum Mengisi Data Ketua</p> }
                                </Col>
                                <Col>
                                    { leaderExist
                                    ? <Button size="sm" color="light" className="shadow float-right" onClick={ () => router.push('/dashboard/ceo/member/leader') }>Edit</Button>
                                    : <Button size="sm" color="success" className="shadow float-right" onClick={ () => router.push('/dashboard/ceo/member/leader') }>Isi Sekarang</Button> }
                                </Col>
                            </Row>
                            <Row className={ "p-3 shadow rounded text-white mb-2 " + (member1Exist ? "bg-success":"bg-danger") }>
                                <Col>
                                    { member1Exist
                                    ? <p className="small m-0 p-0">Sudah Mengisi Data Anggota 1</p>
                                    : <p className="small m-0 p-0">Belum Mengisi Data Anggota 1</p> }
                                </Col>
                                <Col>
                                    { member1Exist
                                    ? <Button size="sm" color="light" className="shadow float-right" onClick={ () => router.push('/dashboard/ceo/member/member1') }>Edit</Button>
                                    : <Button size="sm" color="success" className="shadow float-right" onClick={ () => router.push('/dashboard/ceo/member/member1') }>Isi Sekarang</Button> }
                                </Col>
                            </Row>
                            <Row className={ "p-3 shadow rounded text-white " + (member2Exist ? "bg-success":"bg-warning") }>
                                <Col>
                                    { member2Exist
                                    ? <p className="small m-0 p-0">Sudah Mengisi Data Anggota 2</p>
                                    : <p className="small m-0 p-0">Belum Mengisi Data Anggota 2</p> }
                                </Col>
                                <Col>
                                    { member2Exist
                                    ? <Button size="sm" color="light" className="shadow float-right" onClick={ () => router.push('/dashboard/ceo/member/member2') }>Edit</Button>
                                    : <Button size="sm" color="success" className="shadow float-right" onClick={ () => router.push('/dashboard/ceo/member/member2') }>Isi Sekarang (Opsional)</Button> }
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
            </div>
        )
    }
}

export default withRouter(MemberCEO)