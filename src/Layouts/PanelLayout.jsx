import React from "react";
import { Outlet } from "react-router-dom";




export default function PanelLayout() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-yellow-400">
            PanelLayout
                <div className="bg-black">


                </div>
                <main className="flex-1 mt-1">
                    <Outlet />
                </main>

            </div>
        </>
    );
}