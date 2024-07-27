import React, { memo } from 'react';

const TCTable = memo(function TCTable({ 
  tcData, 
  onPreview,
  onRefresh, 
  isRefreshing
}) {
  const reversedData = [...tcData].reverse();

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center my-4 bg-white">
        <h1 className="text-3xl font-bold">ICREP TC GENERATOR</h1>
        <button 
          className="px-4 py-2 bg-orange-500 text-white rounded flex items-center"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </>
          ) : (
            'Refresh'
          )}
        </button>
      </div>
      <div className="overflow-y-auto flex-grow">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="sticky top-0 bg-slate-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/4">TC Number</th>
              <th className="border border-gray-300 px-4 py-2 w-1/2">Name of the Student</th>
              <th className="border border-gray-300 px-4 py-2 w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reversedData.map((tc, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{tc.tcno}</td>
                <td className="border border-gray-300 px-4 py-2">{tc.nameofthestudent}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => onPreview(tc)}
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TCTable;