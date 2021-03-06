import React from 'react'
import { withRouter } from 'next/router'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Tab from '../register-ec-tab'
import ReactLoading from 'react-loading'
import { database, storage } from '../../firebase'

class RegisterECMember1 extends React.Component {
    state = {
        loading: true,
        saving: false,
        photoSaving: false,
        studentIDSaving: false,
        name: '',
        nim: '',
        majors: '',
        semester: '',
        member1Exist: '',
        photo: '',
        email: '',
        studentID: ''
    }
    
    photoUpload(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('ec-uid')
        let databaseRef = database.ref('pesertaEC/'+uid).child('member1')
        let storageRef = storage.ref('pesertaEC/'+uid).child('member1').child('photo').child(file.name)

        this.setState({ photoSaving: true })
        storageRef.put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(downloadURL => {
                databaseRef.update({ photo: downloadURL })
                .then(() => this.setState({ photo: downloadURL, photoSaving: false }))
            })
    }

    studentIDUpload(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('ec-uid')
        let databaseRef = database.ref('pesertaEC/' + uid).child('member1')
        let storageRef = storage.ref('pesertaEC/' + uid).child('member1').child('studentID').child(file.name)

        this.setState({ studentIDSaving: true })
        storageRef.put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(downloadURL => {
                databaseRef.update({
                    studentID: downloadURL
                })
                this.setState({ studentID: downloadURL, studentIDSaving: false })
            })
    }

    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('ec-uid')

            database.ref('pesertaEC/'+uid).child('member1Exist').once('value')
                .then((member1Exist) => {
                    if (member1Exist.val()) {
                        database.ref('pesertaEC/'+uid).child('member1').once('value')
                            .then((member1) => this.setState({ 
                                loading: false,
                                name: member1.val().name,
                                nim: member1.val().nim,
                                majors: member1.val().majors,
                                semester: member1.val().semester,
                                member1Exist: member1Exist.val(),
                                email: member1.val().email,
                                photo: member1.val().photo,
                                studentID: member1.val().studentID,
                                contact: member1.val().contact
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
        let { name, nim, majors, semester, photo, studentID, contact, email } = this.state
        let uid = localStorage.getItem('ec-uid')

        this.setState({ saving: true })

        database.ref('pesertaEC/'+uid).child('member1').update({
            name, nim, majors, semester, photo, studentID, contact, email
        })
        .then(() => database.ref('pesertaEC/'+uid).update({ member1Exist: true }))
        .then(() => router.push('/register/ec/member2'))

        e.preventDefault()
    }

    render() {
        let { router } = this.props
        let { loading, name, nim, majors, semester, 
            photo, studentID, contact, email,
            photoSaving, studentIDSaving, saving
        } = this.state

        return (
            <Container className="pt-md-5">
                <Row>
                    <Col>
                        <Tab active={ 4 }/>
                        { loading && <ReactLoading className="mx-auto" width={ 64 } height={ 64 } type="spin" color="green" /> }
                        { !loading && <Form onSubmit={ this.onSubmit.bind(this) }>
                            <div className="p-3 bg-white rounded border mb-2">
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label className="small">Nama Lengkap</Label>
                                        <Input size="sm" value={ name } onChange={ e => this.setState({ name: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label className="small">NIM</Label>
                                        <Input type="member" min={1} size="sm" value={ nim } onChange={ e => this.setState({ nim: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label className="small">Jurusan</Label>
                                        <Input size="sm" value={ majors } onChange={ e => this.setState({ majors: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label className="small">Semester</Label>
                                        <Input type="number" min={1} size="sm" value={ semester } onChange={ e => this.setState({ semester: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Kontak (LINE)</Label>
                                        <Input size="sm" value={ contact } onChange={ e => this.setState({ contact: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Email</Label>
                                        <Input type="email" size="sm" value={ email } onChange={ e => this.setState({ email: e.target.value }) } required/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Foto</Label>
                                        <Input type="file" onChange={ this.photoUpload.bind(this) }/>
                                    </FormGroup>
                                    <div className="p-2 bg-success rounded text-center text-white small">
                                        { !photo && !photoSaving && "Belum ada foto." }
                                        { photoSaving && <ReactLoading type="spin" className="mx-auto" color="white" height={ 32 } width={ 32 } /> }
                                        { photo && <center><img className="img-fluid" src={ photo } /></center> }
                                    </div>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label className="small">Scan KTM</Label>
                                        <Input type="file" onChange={ this.studentIDUpload.bind(this) }/>
                                    </FormGroup>
                                    <div className="p-2 bg-success rounded text-center text-white small">
                                        { !studentID && !studentIDSaving && "Belum ada foto." }
                                        { studentIDSaving && <ReactLoading type="spin" className="mx-auto" color="white" height={ 32 } width={ 32 } /> }
                                        { studentID && <center><img className="img-fluid" src={ studentID } /></center> }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-2 bg-white rounded border mb-2">
                            <Row>
                                <Col md="6">
                                    <Button type="reset" size="sm" color="outline-secondary" onClick={ () => router.push('/register/ec/dozen') }>Kembali</Button>
                                </Col>
                                <Col md="6">
                                    <Button type="submit" className="float-right" size="sm" color="outline-success" disabled={ !photo || !studentID }>
                                        { saving && <ReactLoading className="mx-auto" width={ 24 } height={ 24 } type="spin" color="green" /> }
                                        { !saving && "Simpan dan Lanjutkan" }
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        </Form> }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(RegisterECMember1)