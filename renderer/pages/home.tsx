import React, { useState } from 'react'
import Head from 'next/head'
import { Dropdown, Flowbite } from "flowbite-react";
import customTheme from "../styles/flowbiteTheme";


const options = ["1.12.2", "1.15.2", "1.14.4"];

export default function Home() {
    const [actualVersion, setActualVersion] = useState<string | null>(null);

    const handleVersion = (option: string) => {
        console.log("version: " + option);
        setActualVersion(option);
    };

    const handleLaunch = () => {
        try {
            console.log("connection");
        } catch (error) {
            console.error('Erreur lors du lancement :', error);
        }
    };

    return (
        <>
            <Head>
                <title>Home - Minecraft Launcher</title>
            </Head>
            <div className="flex justify-end absolute bottom-10 right-64">
                <Flowbite theme={{ theme: customTheme }}>
                    <Dropdown label={actualVersion != null ? actualVersion : "Choose version"} dismissOnClick={true} placement="top">
                        {options.map(version =>
                            <Dropdown.Item key={version} onClick={() => handleVersion(version)}>{version}</Dropdown.Item>
                        )}
                    </Dropdown>
                </Flowbite>
            </div>
            <button
                className="absolute bg-blue-500 text-white right-8 bottom-8 py-4 px-20 rounded-lg shadow-lg hover:bg-blue-600 transition"
                onClick={handleLaunch}
            >
                Jouer
            </button>
        </>
    );
}
