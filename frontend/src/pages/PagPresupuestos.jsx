import React from 'react';
import BudgetCard from '../components/Presupuesto/BudgetCard';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';




const Page = () => {
  return (
    <>
      <Sidebar></Sidebar>
        <Navbar></Navbar>
        <div className="p-6 max-w-3xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center bg-indigo-800 rounded-full px-3 py-1"></div>
          </header>

          <div className="space-y-4 bg-griscard rounded-lg">
            <BudgetCard title="Personal" date="Fecha: Febrero 2024" balance="Saldo: $900000" />
          </div>
        </div>
     
    </>
  );
};

export default Page;
