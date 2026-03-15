import Head from 'next/head'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Message from '../components/Message'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Happy Birthday Shraddha 🎂</title>
      </Head>
      <main>
        <Hero />
        <Gallery />
        <Message />
        <Footer />
      </main>
    </>
  )
}
