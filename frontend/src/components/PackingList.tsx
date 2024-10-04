import { useState, useEffect } from 'react';
import { mockData, PackingData } from '../utility/PackingList';

const PackingList: React.FC = () => {
    const [packingList, setPackingList] = useState<PackingData[]>([]);

    useEffect(() => {
        // Simulate data fetching
        setPackingList(mockData);
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Packing List</h2>
            <div className="overflow-hidden rounded-lg shadow-md">
                <div className="max-h-[500px] overflow-y-auto no-scrollbar">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="sticky top-0 bg-gray-200 z-10">
                            <tr className="w-full text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Top</th>
                                <th className="py-3 px-6 text-left">Size</th>
                                <th className="py-3 px-6 text-left">Length</th>
                                <th className="py-3 px-6 text-left">Width</th>
                                <th className="py-3 px-6 text-left">Height</th>
                                <th className="py-3 px-6 text-left">Quantity</th>
                                <th className="py-3 px-6 text-left">Color Code</th>
                                <th className="py-3 px-6 text-left">Material</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {packingList.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{item.top}</td>
                                    <td className="py-3 px-6 text-left">{item.size}</td>
                                    <td className="py-3 px-6 text-left">{item.length}</td>
                                    <td className="py-3 px-6 text-left">{item.width}</td>
                                    <td className="py-3 px-6 text-left">{item.height}</td>
                                    <td className="py-3 px-6 text-left">{item.quantity}</td>
                                    <td className="py-3 px-6 text-left">{item.colorCode}</td>
                                    <td className="py-3 px-6 text-left">{item.material}</td>
                                    <td className="py-3 px-6 text-left">
                                        <button className="px-4 py-2 text-white bg-blue-500 rounded-md mx-2 w-full mb-2">Edit</button>
                                        <button className="px-4 py-2 text-white bg-red-500 rounded-md mx-2 w-full">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PackingList;
