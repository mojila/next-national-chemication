import React from 'react'
import Head from 'next/head'

import { Button } from 'reactstrap'

class Index extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Administrasi</title>
                </Head>
                <div className="mt-5">
                    <Button>Adaw</Button>
                </div>
            </div>
        )
    }
}

export default Index
