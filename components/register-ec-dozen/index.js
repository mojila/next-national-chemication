import React from 'react'
import { withRouter } from 'next/router'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Tab from '../register-ec-tab'
import ReactLoading from 'react-loading'
import { database } from '../../firebase'

class RegisterECDozen extends React.Component {
    state = {
        dozenExist: '',
        name: '',
        nip: '',
        contact: '',
        email: '',
        saving: false,
        loading: true
    }
    
    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('ec-uid')

            let dozenExist = database.ref('pesertaEC/'+uid).child('dozenExist')
            dozenExist.once('value')
                .then((dozenExist) => {
                    if (dozenExist.val()) {
                        database.ref('pesertaEC/'+uid).child('dozen').once('value')
                            .then((dozen) => this.setState({ dozenExist: dozenExist.val(), loading: false, 
                                name: dozen.val().name, nip: dozen.val().nip, contact: dozen.val().contact, 
                                email: dozen.val().email }))
                    } else {
                        this.setState({ loading: false })
                    }
                })
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    onSubmit(e) {
        let { router } = this.props
        let uid = localStorage.getItem('ec-uid')
        let { name, nip, contact, email } = this.state

        this.setState({ saving: true })

        database.ref('pesertaEC/'+uid).child('dozen').update({
            name, nip, contact, email
        })
        .then(() => database.ref('pesertaEC/'+uid).update({ dozenExist: true }))
        .then(() => router.push('/register/ec/leader'))

        e.preventDefault()
    }

    render() {
        let { router } = this.props
        let { loading, saving, name, nip, contact, email } = this.state

        return (
            <Container className="pt-md-5">
                <Row>
                    <Col>
                        <Tab active={ 2 }/>
                        <Form onSubmit={ this.onSubmit.bind(this) }>
                        <div className="p-3 bg-white rounded border mb-2">
                            { loading && <ReactLoading className="mx-auto" width={ 64 } height={ 64 } type="spin" color="green" /> }
                            { !loading && <div>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Nama Lengkap</Label>
                                        <Input size="sm" value={ name } onChange={ (e) => this.setState({ name: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">NIDN/NIP</Label>
                                        <Input size="sm" value={ nip } onChange={ (e) => this.setState({ nip: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Kontak WA/LINE</Label>
                                        <Input size="sm" value={ contact } onChange={ (e) => this.setState({ contact: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Email</Label>
                                        <Input size="sm" value={ email } onChange={ (e) => this.setState({ email: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            </div> }
                        </div>
                        <div className="p-2 bg-white rounded border mb-2">
                            <Row>
                                <Col md="6">
                                    <Button type="reset" size="sm" color="outline-secondary" onClick={ () => router.push('/register/ec') }>Kembali</Button>
                                </Col>
                                <Col md="6">
                                    <Button type="submit" className="float-right" size="sm" color="outline-success">
                                        { saving && <ReactLoading className="mx-auto" width={ 24 } height={ 24 } type="spin" color="green" /> }
                                        { !saving && "Simpan & Lanjutkan" }
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(RegisterECDozen)