import React from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { withRouter } from 'next/router'
import ReactLoading from 'react-loading'
import { database, storage } from '../../firebase'

class PaymentHSFC extends React.Component {
    state = {
        saving: false,
        payment: '',
        paymentSaving: false,
        school: '',
        contact: '',
        success: false,
        loading: true
    }

    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let key = localStorage.getItem('payment-key-hsfc') || database.ref('paymentHSFC').push().key
            localStorage.setItem('payment-key-hsfc', key)
            if (key) {
                this.setState({ loading: false })
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    onSubmit(e) {
        let { school, contact, payment } = this.state
        let key = localStorage.getItem('payment-key-hsfc')
        let databaseRef = database.ref('paymentHSFC/'+key)

        this.setState({ saving: true })
        databaseRef.update({
            school, contact, payment
        })
        .then(() => this.setState({ success: true, saving: false, school: '', contact: '', payment: '' }))
        .then(() => localStorage.removeItem('payment-key-hsfc'))

        e.preventDefault()
    }

    onPaymentUpload(e) {
        let file = e.target.files[0]
        let key = localStorage.getItem('payment-key-hsfc')
        let databaseRef = database.ref('paymentHSFC/'+key)
        let storageRef = storage.ref('paymentHSFC/'+key).child('payment').child(file.name)

        this.setState({ paymentSaving: true })
        storageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL => {
            databaseRef.update({ payment: downloadURL })
            .then(() => this.setState({ payment: downloadURL, paymentSaving: false }))
        })
    }
    
    render() {
        let { loading, saving, payment, paymentSaving, school, contact, success } = this.state

        return (
            <div>
                <Container className="pt-md-5 pt-sm-4 pt-xs-4">
                    <div className="border rounded p-3 bg-light mb-2 text-center small text-uppercase">
                        Upload Bukti Pembayaran
                    </div>
                    { success && <div className="p-3 bg-success rounded text-center text-white small mb-2">
                        Terimakasih, Pembayaran anda akan segera di proses konfirmasi akan di kirimkan di nomor handphone yang telah di isi
                    </div> }
                    { loading && <ReactLoading width={32} height={32} color="green" type="spin" className="mx-auto mt-5"/> }
                    { !loading && <Form onSubmit={this.onSubmit.bind(this)}>
                    <div className="border rounded p-3 bg-light mb-2">
                        <Row>
                            <Col md="3">
                                <FormGroup>
                                    <Label className="small">Nama Sekolah</Label>
                                    <Input size="sm" className="mt-3" value={school} onChange={e => this.setState({ school: e.target.value })}/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label className="small">Nomor Handphone (untuk konfirmasi)</Label>
                                    <Input size="sm" value={contact} onChange={e => this.setState({ contact: e.target.value })}/>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label className="small">Upload Bukti Transfer</Label>
                                    <Input type="file" className="mt-3" onChange={this.onPaymentUpload.bind(this)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <div className="p-1 small text-center text-white bg-primary rounded">
                                    { !paymentSaving && !payment && "Upload Bukti Transfer" }
                                    { paymentSaving && <center><ReactLoading width={24} height={24} color="white" type="spin"/></center> }
                                    { payment && <center><img className="img-fluid" src={payment}/></center> }
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="border rounded p-3 bg-light mb-2">
                        <Row>
                            <Col md="6">

                            </Col>
                            <Col md="6">
                                <Button color="success" disabled={ !payment } block>
                                { saving && <ReactLoading width={24} height={24} color="white" className="mx-auto" type="spin"/> }
                                { !saving && "Kirim" }
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    </Form> }
                </Container>
            </div>
        )
    }
}

export default withRouter(PaymentHSFC)