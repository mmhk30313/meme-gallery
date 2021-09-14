import { Divider } from 'antd';
import Link from 'antd/lib/typography/Link';
import Head from 'next/head';
import React from 'react';
import Stats from '../../Components/Stats/Stats';
import request from '../../utils/request';
const index = ({data}: any) => {
    return (
        <div>
            <Head>
                <title>Meme gallery stats</title>
                <meta name="description" content="Meme gallery stats" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="d-flex justify-content-center">
                <h2 style={{width: 'fit-content'}} className="text-center my-4 p-3 border border-round">Meme Gallery</h2>
            </div>
            <h5 className="text-center mb-3" >
                <Link href="/home"><a>See home</a></Link>
            </h5>
            <Stats memes={data}/>
            <footer className={"text-center pb-2"}>
                <Divider/>
                <p>@ Md. Mehedi Hasan Khan {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default index;

export const getStaticProps = async (context: any) => {
    const data = await request("/get-all-memes");
    // const data = await result.json();
    return { 
        props: { 
            data
        }
    }
  }