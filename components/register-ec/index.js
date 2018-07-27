import React from 'react'
import { withRouter } from 'next/router'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Tab from '../register-ec-tab'
import { database } from '../../firebase'
import ReactLoading from 'react-loading'

class RegisterEC extends React.Component {
    state = {
        saving: false,
        paper: {
            title: '',
            subTheme: ''
        },
        university: {
            name: '',
            telephone: '',
            email: '',
            address: ''
        },
        loading: true
    }
    
    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('ec-uid')

            if (uid) {
                let paperFetch = database.ref('pesertaEC/'+uid).child('paper')
                let universityFetch = database.ref('pesertaEC/'+uid).child('university')

                paperFetch.once('value')
                    .then((paper) => {
                        universityFetch.once('value')
                            .then((university) => this.setState({ loading: false, paper: paper.val(), university: university.val() }))
                    })
            } else {
                this.setState({ loading: false })
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }
    
    onSubmit(e) {
        let { router } = this.props
        let { paper, university } = this.state
        let uid = localStorage.getItem('ec-uid') || database.ref('pesertaEC').push().key

        this.setState({ saving: true })

        database.ref('pesertaEC/'+uid).update({
            paper,
            university
        })
        .then(() => localStorage.setItem('ec-uid', uid))
        .then(() => router.push('/register/ec/dozen'))

        e.preventDefault()
    }

    render() {
        let { saving, loading, university, paper } = this.state

        return (
            <Container className="pt-md-5">
                <Row>
                    <Col>
                        <Tab active={ 1 }/>
                        <Form onSubmit={ this.onSubmit.bind(this) }>
                        <div className="p-3 bg-white rounded border mb-2">
                            { loading && <ReactLoading className="mx-auto" width={ 64 } height={ 64 } type="spin" color="green" /> }
                            { !loading && <div><Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Judul Karya</Label>
                                        <Input size="sm" value={ paper.title } onChange={ (e) => {
                                            let res = paper;
                                            res.title = e.target.value
                                            this.setState({ paper: res })
                                        } } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Sub Tema Karya</Label>
                                        <Input size="sm" value={ paper.subTheme } onChange={ (e) => {
                                            let res = paper;
                                            res.subTheme = e.target.value
                                            this.setState({ paper: res })
                                        } } required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                    <FormGroup>
                                        <Label className="small">Nama Institusi Pendidikan</Label>
                                        <Input size="sm" value={ university.name } onChange={ (e) => {
                                            let res = university;
                                            res.name = e.target.value
                                            this.setState({ university: res })
                                        } } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label className="small">Telp Institusi Pendidikan</Label>
                                        <Input size="sm" value={ university.telephone } onChange={ (e) => {
                                            let res = university;
                                            res.telephone = e.target.value
                                            this.setState({ university: res })
                                        } } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label className="small">Email Institusi Pendidikan</Label>
                                        <Input type="email" size="sm" value={ university.email } onChange={ (e) => {
                                            let res = university;
                                            res.email = e.target.value
                                            this.setState({ university: res })
                                        } } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <FormGroup>
                                        <Label className="small">Alamat Institusi Pendidikan</Label>
                                        <Input size="sm" value={ university.address } onChange={ (e) => {
                                            let res = university;
                                            res.address = e.target.value
                                            this.setState({ university: res })
                                        } } required/>
                                    </FormGroup>
                                </Col>
                            </Row></div> }
                        </div>
                        <div className="p-2 bg-white rounded border mb-2">
                            <Row>
                                <Col md="6">
                                    
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

export default withRouter(RegisterEC)