
import React from 'react';

const Header: React.FC = () => (
    <header className="p-6 flex flex-col sm:flex-row justify-between items-center bg-blue-900 text-white rounded-t-xl text-center sm:text-left">
        <div className="order-2 sm:order-1">
            <p className="text-sm font-semibold text-blue-200">CHECKLIST</p>
            <h1 className="text-3xl sm:text-4xl font-bold">KIT TOPOGRAFIA</h1>
            <p className="text-md text-blue-300 mt-1">PANPP</p>
        </div>
        <img src="https://s3.caesb.df.gov.br/www/prod/site1/2024/06/LOGO-CAESB-BRANCA-COMPLETA.png" alt="Logo CAESB" className="h-12 sm:h-16 order-1 sm:order-2 mb-4 sm:mb-0" />
    </header>
);

export default Header;
