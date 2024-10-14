import React from 'react';
import Navbar from '@/src/components/Navbar';
import Sidebar from '@/src/components/Sidebar';
import StockCarousel from '@/src/components/StockCarousel';
import RecentFinancialReports from '@/src/components/RecentFinancialReports';

const OverviewView = () => {
    return (
        <div className="flex flex-col h-screen bg-white">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto">
                    <h1 className="text-3xl font-bold mb-6">Overview</h1>
                    <div className="mb-8">
                        <StockCarousel />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Recent Financial Reports</h2>
                    <div className="mb-6">
                        <RecentFinancialReports />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default OverviewView;