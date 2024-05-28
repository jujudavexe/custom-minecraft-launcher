
export default function ToolsBox(){
    function handleClose(){
        window.ipc.send('close', '')
    }

    function handleMinimize() {
        window.ipc.send('minimize', '')
    }

    return (
        <>
            <div className="flex justify-end w-full">
                <button
                    onClick={handleMinimize}
                    className="text-2xl text-white align-text-top w-10 h-10 hover:bg-gray-700 spac"
                >
                    -
                </button>
                <button
                    onClick={handleClose}
                    className="text-1xl text-white text-center w-10 h-10 hover:bg-red-800"
                >
                    X
                </button>
            </div>
        </>
    );
}