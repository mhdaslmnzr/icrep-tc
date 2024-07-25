"use client"
import { useState, useEffect } from 'react'
import TCTable from './components/TCTable'
import TCPreview from './components/TCPreview'

export default function Home() {
  const [tcData, setTcData] = useState([])
  const [selectedTC, setSelectedTC] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/getSheetData');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTcData(data);
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Transfer Certificate Manager</h1>
      <div className="flex">
        <div className="w-1/2 pr-2">
          <TCTable
            data={tcData}
            onPreview={(tc) => setSelectedTC(tc)}
            onPrint={(tc) => window.print()}
          />
        </div>
        <div className="w-1/2 pl-2">
          {selectedTC && (
            <TCPreview tc={selectedTC} />
          )}
        </div>
      </div>
    </div>
  )
}