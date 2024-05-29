import React, { useState } from 'react'
import Head from 'next/head'
import { CustomFlowbiteTheme, Dropdown, Flowbite } from "flowbite-react";

const options = ["1.12.2", "1.15.2", "1.14.4"];

const customTheme: CustomFlowbiteTheme = {
    "arrowIcon": "ml-2 h-4 w-4",
    "content": "py-1 focus:outline-none",
    "floating": {
        "animation": "transition-opacity",
        "arrow": {
            "base": "absolute z-10 h-2 w-2 rotate-45",
            "style": {
                "dark": "bg-gray-900 dark:bg-gray-700",
                "light": "bg-white",
                "auto": "bg-white dark:bg-gray-700"
            },
            "placement": "-4px"
        },
        "base": "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
        "content": "py-1 text-sm text-gray-700 dark:text-gray-200",
        "divider": "my-1 h-px bg-gray-100 dark:bg-gray-600",
        "header": "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
        "hidden": "invisible opacity-0",
        "item": {
            "container": "",
            "base": "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
            "icon": "mr-2 h-4 w-4"
        },
        "style": {
            "dark": "bg-gray-900 text-white dark:bg-gray-700",
            "light": "border border-gray-200 bg-white text-gray-900",
            "auto": "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
        },
        "target": "w-fit"
    },
    "inlineWrapper": "flex items-center"
};

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
