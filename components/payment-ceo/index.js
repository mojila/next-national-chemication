import React from 'react'
import NavigatorDashboard from '../navigator-dashboard-ceo'
import { withRouter } from 'next/router'
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import { database, storage } from '../../firebase'
import ReactLoading from 'react-loading'

class PaymentCEO extends React.Component {
    state = {
        payed: false,
        payment: '',
        paymentSaving: false,
        loading: true
    }

    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('ceo-uid')
            let payedFetch = database.ref('pesertaCEO/' + uid).child('payed')
            let paymentFetch = database.ref('pesertaCEO/'+uid).child('payment')

            payedFetch.once('value')
                .then((payed) => {
                if (payed.val()) {
                    paymentFetch.once('value')
                        .then((payment) => this.setState({ payed: payed.val(), payment: payment.val(), loading: false }))
                } else {
                    paymentFetch.once('value')
                        .then((payment) => this.setState({ payment: payment.val(), loading: false }))
                }
            })
        }
    }
    
    componentWillUnmount() {
        this.mounted = false
    }

    paymentUpload(e) {
        let file = e.target.files[0]

        let uid = localStorage.getItem('ceo-uid')
        let databaseRef = database.ref('pesertaCEO/' + uid)
        let storageRef = storage.ref('pesertaCEO/' + uid).child('payment').child(file.name)

        this.setState({ paymentSaving: true })
        storageRef.put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(downloadURL => {
                databaseRef.update({
                    payment: downloadURL
                })
                this.setState({ payment: downloadURL, paymentSaving: false })
            })
    }

    render() {
        let { payed, payment, paymentSaving, loading } = this.state

        return (
            <div>
                <NavigatorDashboard/>
                <Container className="pt-5">
                    { loading && <ReactLoading className="mx-auto pt-5" width={ 64 } height={ 64 } type="spin" color="green" /> }
                    {  !loading && !payment && <Row className="bg-warning p-3 rounded shadow mb-2">
                        <Col>
                            <p className="p-0 m-0">Silahkan Upload Bukti Transfer Ke Bank BNI No. Rekening 0710362769 A/N Dyah Wimala Ramaniya </p>
                        </Col>
                    </Row>}
                    { !loading && payment && !payed && <Row className="bg-success p-3 rounded shadow mb-2">
                        <Col>
                            <p className="text-white p-0 m-0">Pembarayan sedang menunggu konfirmasi.</p>
                        </Col>
                    </Row> }
                    { !loading && <Form>
                        <Row className="p-3 bg-white shadow rounded">
                            <Col md="6">
                                <FormGroup>
                                    <Label>Pilih Bukti Transfer</Label>
                                    <Input type="file" onChange={ this.paymentUpload.bind(this) } />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                { (payment || paymentSaving) && <div className="p-2 bg-success rounded">
                                    { paymentSaving && <center><ReactLoading className="mx-auto pt-5" width={ 32 } height={ 32 } type="spin" color="green" /></center> }
                                    { payment && <center><img className="img-fluid" src={ payment }/></center> }
                                </div> }
                            </Col>
                        </Row>
                    </Form> }
                </Container>
            </div>
        )
    }
}

export default withRouter(PaymentCEO)