import React from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { withRouter } from 'next/router'
import RegisterHSFCTab from '../register-hsfc-tab'
import RegisterHSFCOfficialTab from '../register-hsfc-official-tab'
import ReactLoading from 'react-loading'
import { database, storage } from '../../firebase'

class RegisterHSFCOfficial1 extends React.Component {
    state = {
        loading: true,
        saving: false,
        photoSaving: false,
        official1Exist: false,
        photo: '',
        name: '',
        contact: ''
    }

    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('hsfc-uid')
            let databaseRef = database.ref('pesertaHSFC/'+uid)

            databaseRef.child('official1Exist').once('value')
            .then((official1Exist) => {
                if (official1Exist.val()) {
                    databaseRef.child('official1').once('value')
                    .then((official1) => this.setState({
                        official1Exist: official1Exist.val(), 
                        name: official1.val().name,
                        contact: official1.val().contact,
                        photo: official1.val().photo,
                        loading: false
                    }))
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
        let { name, contact, photo } = this.state
        let uid = localStorage.getItem('hsfc-uid')
        let databaseRef = database.ref('pesertaHSFC/'+uid).child('official1')

        this.setState({ saving: true })

        databaseRef.update({
            name, contact, photo
        })
        .then(() => database.ref('pesertaHSFC/'+uid).update({
            official1Exist: true
        }))
        .then(() => router.push('/register/hsfc/official2'))

        e.preventDefault()
    }

    onUploadPhoto(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('hsfc-uid')
        let storageRef = storage.ref('pesertaHSFC/'+uid).child('official1').child('photo').child(file.name)
        let databaseRef = database.ref('pesertaHSFC/'+uid).child('official1')

        this.setState({ photoSaving: true })

        storageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL => {
            databaseRef.update({ photo: downloadURL })
            .then(() => this.setState({ photo: downloadURL, photoSaving: false }))
        })
    }

    render() {
        let { loading, saving, photoSaving, photo, name, contact } = this.state
        let { router } = this.props

        return (
            <div>
                <Container className="pt-md-5 pt-sm-1">
                    <RegisterHSFCTab active={2}/>
                    <RegisterHSFCOfficialTab active={1}/>
                    { loading && <ReactLoading className="mx-auto" width={64} height={64} type="spin" color="green"/> }
                    { !loading && <Form onSubmit={this.onSubmit.bind(this)}>
                    <div className="p-3 bg-light border mb-2 rounded">
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label className="small">Nama</Label>
                                    <Input size="sm" value={name} onChange={e => this.setState({ name: e.target.value })} required/>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label className="small">Kontak WA/Line</Label>
                                    <Input size="sm" value={contact} onChange={e => this.setState({ contact: e.target.value })} required/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label className="small">Upload Foto Formal</Label>
                                    <Input size="sm" type="file" onChange={this.onUploadPhoto.bind(this)}/>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <div className="p-3 mt-4 bg-success rounded text-center text-white small">
                                    { !photoSaving && !photo && "Upload Foto Diri" }
                                    { photoSaving && <center><ReactLoading width={32} height={32} type="spin" color="white"/></center> }
                                    { !photoSaving && photo && <center><img src={ photo } className="img-fluid"/></center> }
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="p-3 bg-light border rounded mb-5">
                        <Row>
                            <Col md="6" sm="6" xs="6">
                                <Button type="reset" color="outline-secondary" size="sm" onClick={() => router.push('/register/hsfc')}>Kembali</Button>
                            </Col>
                            <Col md="6" sm="6" xs="6">
                                <Button disabled={!photo} className="float-right" color="outline-primary" size="sm">
                                { saving && <ReactLoading className="mx-auto" width={24} height={24} type="spin" color="white"/> }
                                { !saving && "Simpan dan Lanjutkan" }
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

export default withRouter(RegisterHSFCOfficial1)