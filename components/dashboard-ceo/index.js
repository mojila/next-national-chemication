import React from 'react'
import { withRouter } from 'next/router'
import NavigatorDashboard from '../navigator-dashboard-ceo';
import { Container, Row, Col, Button, Badge } from 'reactstrap'
import ReactLoading from 'react-loading'
import { database } from '../../firebase'

class Dashboard extends React.Component {
    state = {
        loading: true,
        teamName: '',
        school: '',
        payed: '',
        complete: '',
        leaderExist: '',
        member1Exist: '',
        member2Exist: '',
    }

    componentDidMount() {
        let uid = localStorage.getItem('ceo-uid')
        let teamNameFetch = database.ref('pesertaCEO/' + uid).child('teamName').once('value')
        let schoolFetch = database.ref('pesertaCEO/' + uid).child('school').once('value')
        let payedFetch = database.ref('pesertaCEO/' + uid).child('payed').once('value')
        let leaderExistFetch = database.ref('pesertaCEO/' + uid).child('leaderExist').once('value')
        let member1ExistFetch = database.ref('pesertaCEO/' + uid).child('member1Exist').once('value')


        teamNameFetch.then((teamName) => {
            this.setState({ teamName: teamName.val() })

            schoolFetch.then((school) => {
                this.setState({ school: school.val() })

                payedFetch.then((payed) => {
                    if (payed.val()) {
                        this.setState({ payed: payed.val() })
                    } else {
                        this.setState({ payed: false })
                    }

                    leaderExistFetch.then((leaderExist) => {
                        if (leaderExist.val()) {
                            this.setState({ leaderExist: leaderExist.val() })
                        } else {
                            this.setState({ leaderExist: false })
                        }

                        member1ExistFetch.then((member1Exist) => {
                            if (member1Exist.val()) {
                                this.setState({ member1Exist: member1Exist.val(), loading: false })
                            } else {
                                this.setState({ member1Exist: false, loading: false })
                            }
                        })
                    })
                })
            })
        })
    }

    render() {
        let { router } = this.props
        let { loading, teamName, school, payed, leaderExist, member1Exist } = this.state

        return (
            <div>
                <NavigatorDashboard/>
                { loading && <ReactLoading className="mx-auto pt-5 mt-5" width={ 64 } height={ 64 } type="spin" color="green" /> }
                { !loading && <Container className="pt-5 mt-4 mt-sm-4 mt-xs-5">
                { (!member1Exist || !leaderExist) && 
                    <Row className="mt-xs-5 p-3 bg-warning shadow rounded mb-1">
                        <Col>
                            <div className="small text-capitalize">
                                <span className="font-weight-bold">Peringatan: </span> Biodata Peserta Belum Lengkap, Silahkan mengisi biodata secara lengkap
                            </div>
                        </Col>
                        <Col>
                            <Button onClick={ () => router.push('/dashboard/ceo/member') } size="sm" color="light" className="shadow float-right">Lengkapi Biodata Sekarang</Button>
                        </Col>
                    </Row> }
                    { !payed &&
                    <Row className="p-3 bg-warning shadow rounded mb-1">
                        <Col>
                            <div className="small text-capitalize">
                                <span className="font-weight-bold">Peringatan: </span> Silahkan melunasi biaya pendaftaran sebesar <Badge>Rp. 90.000,-</Badge> 
                                Untuk Tanggal Promo 17 Juli - 14 Oktober.
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                                <Button size="sm" color="light" className="shadow mr-1">Petunjuk Pembayaran</Button>
                                <Button size="sm" color="success" className="shadow" onClick={ () => router.push('/dashboard/ceo/payment') }>Konfirmasi Pembayaran</Button>
                            </div>
                        </Col>
                    </Row> }
                    <Row className="p-3 bg-white shadow rounded">
                        <Col>
                            <div className="small">Nama Tim: { teamName }</div>
                            <div className="small">Sekolah: { school }</div>
                        </Col>
                        <Col>
                            <div className="small">Status Pembayaran: { payed ? "Lunas":"Belum Lunas" }</div>
                            <div className="small">Status Pendaftaran: { leaderExist && member1Exist ? "Lengkap":"Belum Lengkap" }</div>
                        </Col>
                    </Row>
                </Container> }
            </div>
        )
    }
}

export default withRouter(Dashboard)