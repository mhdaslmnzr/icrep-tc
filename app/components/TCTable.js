export default function TCTable({ data, onPreview, onPrint }) {
    return (
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">TC No</th>
            <th className="border border-gray-300 p-2">Name of Student</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tc, index) => (
            <tr key={tc['TC.No.'] || index}>
            <td className="border border-gray-300 p-2">{tc['tcno']}</td>
            <td className="border border-gray-300 p-2">{tc['nameofthestudent']}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => onPreview(tc)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Preview</button>
                <button onClick={() => onPrint(tc)} className="bg-green-500 text-white px-2 py-1 rounded">Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }