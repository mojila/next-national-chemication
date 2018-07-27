import React from 'react'
import NavigatorDashboard from '../navigator-dashboard-ceo'
import { withRouter } from 'next/router'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import ReactLoading from 'react-loading'
import { database, storage } from '../../firebase'

class LeaderCEO extends React.Component {
    state = {
        leaderExist: '',
        error: "",
        name: "",
        gender: "",
        nisn: "",
        birth: {
            place: "",
            date: ""
        },
        classLevel: "",
        address: "",
        photo: "",
        contact: "",
        studentID: '',
        loading: true,
        saved: false,
        saving: false,
        photoSaving: false,
        studentIDSaving: false
    };
    
    componentDidMount() {
        this.mounted = true

        if (this.mounted) {
            let uid = localStorage.getItem('ceo-uid')
            let leaderExistFetch = database.ref('pesertaCEO/' + uid).child('leaderExist')
            let leaderFetch = database.ref('pesertaCEO/' + uid).child('leader')

            leaderExistFetch.once('value').then((leaderExist) => {
                if (leaderExist.val()) {
                    leaderFetch.once('value').then((leader) => {
                        let res = leader.val()

                        this.setState({
                            name: res.name,
                            gender: res.gender,
                            nisn: res.nisn,
                            birth: {
                                place: res.birth.place,
                                date: res.birth.date
                            },
                            classLevel: res.classLevel,
                            address: res.address,
                            photo: res.photo,
                            contact: res.contact,
                            studentID: res.studentID,
                            loading: false, 
                            leaderExist: leaderExist.val()
                        })
                    })
                } else {
                    this.setState({ loading: false, leaderExist: false })
                }
            })
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    photoUpload(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('ceo-uid')
        let databaseRef = database.ref('pesertaCEO/' + uid).child('leader')
        let storageRef = storage.ref('pesertaCEO/' + uid).child('leader').child('photo').child(file.name)

        this.setState({ photoSaving: true })
        storageRef.put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(downloadURL => {
                databaseRef.update({
                    photo: downloadURL
                })
                this.setState({ photo: downloadURL, photoSaving: false })
            })
    }

    studentIDUpload(e) {
        let file = e.target.files[0]
        let uid = localStorage.getItem('ceo-uid')
        let databaseRef = database.ref('pesertaCEO/' + uid).child('leader')
        let storageRef = storage.ref('pesertaCEO/' + uid).child('leader').child('studentID').child(file.name)

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

    onSubmit(e) {
        let uid = localStorage.getItem('ceo-uid')
        let { name, gender, nisn, birth, classLevel, address, photo, contact, studentID } = this.state
        let databaseRef = database.ref('pesertaCEO/' + uid).child('leader')

        this.setState({ saving: true })
        databaseRef.update({
            name,
            gender,
            nisn,
            birth,
            classLevel,
            address,
            photo,
            contact,
            studentID
        }).then(() => {
            database.ref('pesertaCEO/' + uid).update({
                leaderExist: true
            }).then(() => this.setState({ saving: false, saved: true, leaderExist: true }))
        })

        e.preventDefault()
    }

    render() {
        let { 
            loading, saved, saving, photo, studentID,
            name, gender, leaderExist, nisn, classLevel, 
            birth, photoSaving, studentIDSaving, contact,
            address
        } = this.state
        let { router } = this.props

        return (
            <div>
                <NavigatorDashboard/>
                <Container className="pt-md-5">
                    { loading && <ReactLoading className="mx-auto pt-5" width={ 64 } height={ 64 } type="spin" color="green" /> }
                    { saved && <Row className="mb-2 p-3 bg-success rounded shadow">
                        <Col>
                            <p className="m-0 p-0 text-white text-center">Berhasil Disimpan</p>
                        </Col>
                    </Row> }
                    { !loading && <Form onSubmit={ this.onSubmit.bind(this) }>
                        <Row className="mb-2 p-3 bg-white shadow rounded">
                            <Col>
                                <p className="m-0 p-0 text-center">Ketua</p>
                            </Col>
                        </Row>
                        <Row className="mb-2 p-3 bg-white shadow rounded">
                            <Col md="3">
                                <FormGroup>
                                    <Label>Nama Lengkap</Label>
                                    <Input value={ name } onChange={ (e) => this.setState({ name: e.target.value }) } required/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Jenis Kelamin</Label>
                                    <select className="form-control" value={ gender } onChange={ (e) => this.setState({ gender: e.target.value }) } required>
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="laki-laki">Laki - laki</option>
                                        <option value="perempuan">Perempuan</option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>NISN</Label>
                                    <Input type="number" value={ nisn } onChange={ (e) => this.setState({ nisn: e.target.value }) } required/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Kelas (10,11,12)</Label>
                                    <Input type="number" min={ 10 } max={ 12 } value={ classLevel } onChange={ (e) => this.setState({ classLevel: e.target.value }) } required/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Tempat Lahir</Label>
                                    <Input value={ birth.place } onChange={ (e) => {
                                        let res = birth
                                        res.place = e.target.value
                                        this.setState({ birth: res })
                                    } } required/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Tanggal Lahir</Label>
                                    <Input type="date" value={ birth.date } onChange={ (e) => {
                                        let res = birth
                                        res.date = e.target.value
                                        this.setState({ birth: res })
                                    } } required/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Kontak WA/LINE</Label>
                                    <Input value={ contact } onChange={ (e) => this.setState({ contact: e.target.value }) } required/>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Alamat</Label>
                                    <Input value={ address } onChange={ (e) => this.setState({ address: e.target.value }) } required/>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label>Foto Diri</Label>
                                    <Input type="file" accept="image/*" onChange={ this.photoUpload.bind(this) }/>
                                </FormGroup>
                                { (photo || photoSaving) && <div className="p-2 bg-success rounded">
                                    <center>
                                        { photo && <img src={ photo } className="img-fluid"/> }
                                        { photoSaving && <ReactLoading width={ 32 } height={ 32 } color="white" className="mx-auto" type="spin"/> }
                                    </center>
                                </div> }
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label>Scan Kartu Pelajar/Rapor/Surat Keterangan Siswa tsb.</Label>
                                    <Input type="file" accept="image/*" onChange={ this.studentIDUpload.bind(this) } />
                                </FormGroup>
                                { (studentID || studentIDSaving) && <div className="p-2 bg-success rounded">
                                    <center>
                                        { studentID && <img src={ studentID } className="img-fluid"/> }
                                        { studentIDSaving && <ReactLoading width={ 32 } height={ 32 } color="white" className="mx-auto" type="spin"/> }
                                    </center>
                                </div> }
                            </Col>
                        </Row>
                        <Row className="mb-2 p-3 bg-white shadow rounded">
                            <Col md="4"></Col>
                            <Col md="4">
                                <Button type="submit" color="success" block disabled={ saving }> 
                                    { saving && <ReactLoading width={ 24 } height={ 24 } color="white" className="mx-auto" type="spin"/> }
                                    { !saving && "Simpan" }
                                </Button>
                            </Col>
                            <Col md="4">
                                <Button type="reset" color="primary" block onClick={ () => router.push('/dashboard/ceo/member/member1') } disabled={ !leaderExist }>Lanjut</Button>
                            </Col>
                        </Row>
                    </Form> }
                </Container>
            </div>
        )
    }
}

export default withRouter(LeaderCEO)