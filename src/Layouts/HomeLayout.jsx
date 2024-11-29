import React from "react";
import { Outlet } from "react-router-dom";




export default function HomeLayout() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-yellow-400">
                <div className="bg-black">


                </div>
                <main className="flex-1 mt-1">
                    <Outlet />
                </main>

            </div>
        </>
    );
}