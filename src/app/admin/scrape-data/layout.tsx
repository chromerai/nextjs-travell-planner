import { Sidebar } from '@/components/admin/sidebar';
import React from 'react';


const AdminLayout = ({ children}: { children: React.ReactNode }) => {
    return (
        <section className="bg-[#f5f5fe] text-black flex">
            <Sidebar />
            <section className="flex-1 flex flex-col">
                <div className='h-48 bg-[#0E1428] text-white flex justify-center flex-col px-10 gap-3'>
                    <h1 className='text-5xl'>Scape Data</h1>
                    <p>The scape engine is powered by Bright Data</p>
                </div>
                {children}
            </section>
        </section>
    );
};

export default AdminLayout;