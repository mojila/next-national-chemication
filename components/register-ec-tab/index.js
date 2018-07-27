import React from 'react'
import { withRouter } from 'next/router'

class Tab extends React.Component {
    render() {
        let { active } = this.props

        return (
            <div>
                <div className="p-2 bg-white rounded border mb-2">
                    <div className="d-none small d-flex justify-content-center">
                        <div className={ "text-center border p-2 m-1 rounded flex-fill " + (active === 1 ? "bg-primary text-white":"bg-light")}>Info Dasar</div>
                        <div className={ "text-center border p-2 m-1 rounded flex-fill " + (active === 2 ? "bg-primary text-white":"bg-light")}>Dosen Pembimbing</div>
                        <div className={ "text-center border p-2 m-1 rounded flex-fill " + (active === 3 ? "bg-primary text-white":"bg-light")}>Ketua</div>
                        <div className={ "text-center border p-2 m-1 rounded flex-fill " + (active === 4 ? "bg-primary text-white":"bg-light")}>Anggota 1</div>
                        <div className={ "text-center border p-2 m-1 rounded flex-fill " + (active === 5 ? "bg-primary text-white":"bg-light")}>Anggota 2</div>
                        <div className={ "text-center border p-2 m-1 rounded flex-fill " + (active === 6 ? "bg-primary text-white":"bg-light")}>Konfirmasi</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Tab)