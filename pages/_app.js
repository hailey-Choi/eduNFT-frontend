import '../styles/tailwind.css'
import { AppWrapper } from '../components/AppContext'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    )
}
