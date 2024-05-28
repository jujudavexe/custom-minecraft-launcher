import React from 'react'
import Head from 'next/head'

function handleLaunch(){
    try {
        console.log("connection");
    } catch (error) {
        console.error('Erreur lors du lancement :', error);
    }
}

export default function Home() {
    return (
        <>
            <Head>
                <title>Home - Minecraft Launcher</title>
            </Head>
            <button
                className="absolute bottom-8 right-8 bg-blue-500 text-white py-4 px-20 rounded-lg shadow-lg hover:bg-blue-600 transition "
                onClick={handleLaunch}
            >
                Jouer
            </button>

        </>
    )
}
