import React from 'react'
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { withRouter } from 'next/router'
import RegisterHSFCTab from '../register-hsfc-tab'
import RegisterHSFCPlayerTab from '../register-hsfc-player-tab'
import ReactLoading from 'react-loading'
import { database, storage } from '../../firebase'

class RegisterHSFCPlayer7 extends React.Component {
    state = {
        loading: true,
        saving: false,
        name: '',
        birthPlace: '',
        birthDate: '',
        backNumber: '',
        contact: '',
        photo: '',
        photoSaving: '',
        studentCard: '',
        studentCardSaving: '',
        reportCard: '',
        reportCardSaving: ''
    }

    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('hsfc-uid')
            let databaseRef = database.ref('pesertaHSFC/'+uid)

            databaseRef.child('player7Exist').once('value')
            .then(player7Exist => {
                if (player7Exist.val()) {
                    databaseRef.child('player7').once('value')
                    .then(player7 => this.setState({
                        name: player7.val().name,
                        birthPlace: player7.val().birthPlace,
                        birthDate: player7.val().birthDate,
                        backNumber: player7.val().backNumber,
                        contact: player7.val().contact,
                        photo: player7.val().photo,
                        studentCard: player7.val().studentCard,
                        reportCard: player7.val().reportCard,
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
        let { 
            name, birthPlace, birthDate, backNumber, contact,
            photo, studentCard, reportCard
        } = this.state
        let { router } = this.props
        let uid = localStorage.getItem('hsfc-uid')
        let databaseRef = database.ref('pesertaHSFC/'+uid)

        this.setState({ saving: true })
        databaseRef.child('player7').update({
            name, birthDate, birthPlace, backNumber, contact,
            photo, studentCard, reportCard
        })
        .then(() => databaseRef.update({
            player7Exist: true
        }))
        .then(() => router.push('/register/hsfc/player8'))

        e.preventDefault()
    }

    onPhotoUpload(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('hsfc-uid')
        let databaseRef = database.ref('pesertaHSFC/'+uid).child('player7')
        let storageRef = storage.ref('pesertaHSFC/'+uid).child('player7').child('photo').child(file.name)

        this.setState({ photoSaving: true })
        storageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL => {
            databaseRef.update({ photo: downloadURL })
            .then(() => this.setState({ photo: downloadURL, photoSaving: false }))
        })
    }

    onStudentCardUpload(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('hsfc-uid')
        let databaseRef = database.ref('pesertaHSFC/'+uid).child('player7')
        let storageRef = storage.ref('pesertaHSFC/'+uid).child('player7').child('studentCard').child(file.name)

        this.setState({ studentCardSaving: true })
        storageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL => {
            databaseRef.update({ studentCard: downloadURL })
            .then(() => this.setState({ studentCard: downloadURL, studentCardSaving: false }))
        })
    }

    onReportCardUpload(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('hsfc-uid')
        let databaseRef = database.ref('pesertaHSFC/'+uid).child('player7')
        let storageRef = storage.ref('pesertaHSFC/'+uid).child('player7').child('reportCard').child(file.name)

        this.setState({ reportCardSaving: true })
        storageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL => {
            databaseRef.update({ reportCard: downloadURL })
            .then(() => this.setState({ reportCard: downloadURL, reportCardSaving: false }))
        })
    }

    render() {
        let { 
            saving, loading, name, birthPlace, birthDate, backNumber, contact,
            photo, studentCard, reportCard, photoSaving, studentCardSaving,
            reportCardSaving
        } = this.state
        let { router } = this.props

        return (
            <div>
                <Container className="pt-md-5 pt-sm-7">
                    <RegisterHSFCTab active={3}/>
                    <RegisterHSFCPlayerTab active={7}/>
                    { loading && <ReactLoading width={64} height={64} color="green" type="spin" className="mx-auto mt-5"/> }
                    { !loading && <Form onSubmit={ this.onSubmit.bind(this) }>
                    <div className="p-3 bg-light rounded border mb-2">
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label className="small">Nama</Label>
                                    <Input size="sm" value={name} onChange={e => this.setState({ name: e.target.value })} required/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label className="small">Tempat Lahir</Label>
                                    <Input size="sm" value={birthPlace} onChange={e => this.setState({ birthPlace: e.target.value })} required/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label className="small">Tanggal Lahir</Label>
                                    <Input size="sm" type="date" value={birthDate} onChange={e => this.setState({ birthDate: e.target.value })} required/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label className="small">Nomor Punggung</Label>
                                    <Input size="sm" type="number" value={backNumber} onChange={e => this.setState({ backNumber: e.target.value })} required/>
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
                                    <Label className="small">Foto Diri (3x4)</Label>
                                    <Input type="file" onChange={this.onPhotoUpload.bind(this)}/>
                                </FormGroup>
                                <div className="p-1 small text-center text-white border bg-success rounded">
                                    { !photoSaving && !photo && "Upload Foto Diri" }
                                    { photoSaving && <center><ReactLoading width={32} height={32} color="white" type="spin"/></center> }
                                    { photo && <center><img src={photo} className="img-fluid"/></center> }
                                </div>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label className="small">Scan Kartu Pelajar</Label>
                                    <Input type="file" onChange={this.onStudentCardUpload.bind(this)}/>
                                </FormGroup>
                                <div className="p-1 small text-center text-white border bg-success rounded">
                                    { !studentCardSaving && !studentCard && "Upload Kartu Pelajar" }
                                    { studentCardSaving && <center><ReactLoading width={32} height={32} color="white" type="spin"/></center> }
                                    { studentCard && <center><img src={studentCard} className="img-fluid"/></center> }
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label className="small">Scan Raport (hanya bagian biodata)</Label>
                                    <Input type="file" onChange={this.onReportCardUpload.bind(this)}/>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <div className="p-1 small text-center text-white border bg-success rounded mt-md-4">
                                    { !reportCardSaving && !reportCard && "Upload Foto Diri" }
                                    { reportCardSaving && <center><ReactLoading width={32} height={32} color="white" type="spin"/></center> }
                                    { reportCard && <center><img src={reportCard} className="img-fluid"/></center> }    
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="p-3 bg-light rounded border mb-5">
                        <Row>
                            <Col md="6" sm="6" xs="6">
                                <Button type="reset" color="outline-secondary" size="sm" onClick={() => router.push('/register/hsfc/player7')}>Kembali</Button>
                            </Col>
                            <Col md="6" sm="6" xs="6">
                                <Button disabled={!photo || !studentCard || !reportCard} className="float-right" color="outline-primary" size="sm">
                                { saving && <ReactLoading className="mx-auto" width={24} height={24} type="spin" color="white"/> }
                                { !saving && "Simpan dan Lanjutkan" }
                                </Button>
                                <Button type="reset" size="sm" color="outline-warning" className="float-right mr-2" onClick={() => router.push('/register/hsfc/player8')}>Lewati</Button>
                            </Col>
                        </Row>
                    </div>
                    </Form> }
                </Container>
            </div>
        )
    }
}
    

export default withRouter(RegisterHSFCPlayer7)