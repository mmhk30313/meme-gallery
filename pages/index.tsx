import { Divider } from 'antd';
import Link from 'antd/lib/typography/Link';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Main from '../Components/Main/Main';
import request from '../utils/request';
// import AOS from "aos";
// import "aos/dist/aos.css";
export default function Home({data}: any) {
//   useEffect(() =>{AOS.init();}, [""]);
  return (
    <div>
            <Head>
                <title>Meme gallery home</title>
                <meta name="description" content="Meme gallery home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="d-flex justify-content-center">
                <h2 style={{width: 'fit-content'}} className="animate__flipOutX text-center my-4 p-3 border border-round">Meme Gallery</h2>
            </div>
            <h5 className="text-center mb-3" >
                <Link href="/stats"><a>See Stats</a></Link>
            </h5>
            <Main memes={data}/>
            <footer className={"text-center pb-2"}>
                <Divider/>
                <p>@ Md. Mehedi Hasan Khan {new Date().getFullYear()}</p>
            </footer>
        </div>
  )
}

export const getStaticProps = async (context: any) => {
    const data = await request("/get-all-memes");
    // const data = await result.json();
    return { 
        props: { 
            data
        }
    }
  }