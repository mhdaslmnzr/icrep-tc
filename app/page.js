"use client"
import React, { useState, useEffect } from 'react';
import TCTable from './components/TCTable';
import TCPreview from './components/TCPreview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import LoadingAnimation from './components/LoadingAnimation';

function useSheetData() {
    const [tcData, setTcData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    async function fetchData() {
      try {
        const response = await fetch('/api/getSheetData');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTcData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { tcData, error, loading, refreshData: fetchData };
  }

export default function Home() {
  const { tcData, error, loading, refreshData } = useSheetData();
  const [selectedTC, setSelectedTC] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloadingTC, setIsDownloadingTC] = useState(false);
  const [isDownloadingCC, setIsDownloadingCC] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const handleTCDownload = async (tc) => {
    setIsDownloadingTC(true);
    const inputOriginal = document.getElementById('tc-preview-original');
    const inputCopy = document.getElementById('tc-preview-copy');
  
    if (!inputOriginal || !inputCopy) {
      console.error('TC Preview elements not found');
      setIsDownloadingTC(false);
      return;
    }
  
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
  
      const canvasOriginal = await html2canvas(inputOriginal, { scale: 2, logging: false, useCORS: true });
      const canvasCopy = await html2canvas(inputCopy, { scale: 2, logging: false, useCORS: true });
  
      const imgDataOriginal = canvasOriginal.toDataURL('image/jpeg', 1.0);
      const imgDataCopy = canvasCopy.toDataURL('image/jpeg', 1.0);
  
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      pdf.addImage(imgDataOriginal, 'JPEG', 0, 0, 210, 297);
      pdf.addPage();
      pdf.addImage(imgDataCopy, 'JPEG', 0, 0, 210, 297);
  
      pdf.save(`${tc.tcno}_${tc.nameofthestudent.replace(/\s+/g, '_')}_TC.pdf`);
    } catch (error) {
      console.error('Error generating TC PDF:', error);
      alert('Failed to generate TC PDF. Please try again.');
    } finally {
      setIsDownloadingTC(false);
    }
  };

  const handleCCDownload = async (tc) => {
    setIsDownloadingCC(true);
    const conductOriginal = document.getElementById('conduct-certificate-original');
    const conductCopy = document.getElementById('conduct-certificate-copy');

    if (!conductOriginal || !conductCopy) {
      console.error('Conduct Certificate elements not found');
      setIsDownloadingCC(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvasConductOriginal = await html2canvas(conductOriginal, { scale: 2, logging: false, useCORS: true });
      const canvasConductCopy = await html2canvas(conductCopy, { scale: 2, logging: false, useCORS: true });

      const imgDataConductOriginal = canvasConductOriginal.toDataURL('image/jpeg', 1.0);
      const imgDataConductCopy = canvasConductCopy.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF('l', 'mm', [220, 180]);

      pdf.addImage(imgDataConductOriginal, 'JPEG', 0, 0, 220, 180);
      pdf.addPage();
      pdf.addImage(imgDataConductCopy, 'JPEG', 0, 0, 220, 180);

      pdf.save(`${tc.ccno}_${tc.nameofthestudent.replace(/\s+/g, '_')}_CC.pdf`);
    } catch (error) {
      console.error('Error generating CC PDF:', error);
      alert('Failed to generate CC PDF. Please try again.');
    } finally {
      setIsDownloadingCC(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 overflow-y-auto">
        {loading ? (
          <LoadingAnimation />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <TCTable 
            tcData={tcData} 
            onPreview={setSelectedTC} 
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        )}
      </div>
      <div className="w-1/2 p-4 overflow-y-auto">
        {selectedTC && (
          <TCPreview 
            tc={selectedTC} 
            onTCDownload={() => handleTCDownload(selectedTC)}
            onCCDownload={() => handleCCDownload(selectedTC)}
            isDownloadingTC={isDownloadingTC}
            isDownloadingCC={isDownloadingCC}
          />
        )}
      </div>
    </div>
  );
}