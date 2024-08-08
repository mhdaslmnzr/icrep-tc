import Image from "next/image";
import ConductCertificatePreview from "./ConductCertificatePreview";


const fieldLabels = {
  nameofthestudent: 'Name of the Student',
  admissionno: 'Admission Number',
  studentid: 'Student ID',
  dateofbirth: 'Date of Birth',
  gender: 'Gender',
  religionandcaste: 'Religion and Caste',
  nameoftheprogram: 'Name of the Program for which the student admitted',
  dateofadmission: 'Date of Admission',
  dateofleaving: 'Date of Leaving',
  reasonforleaving: 'Reason for Leaving',
  classinwhichstudied: 'Class in which studied at the time of leaving',
  whetherqualifiedforpromotion: 'Whether qualified for promotion',
  detailsofuniversityexaminationattended: 'Details of University Examination Attended',
  regnoofexamination: 'Registration Number of Examination',
  datemonthandyearofexamination: 'Month and year of examination',
  nameoftheuniversityexaminationforwhichthestudentlastattended: 'Name of the University Examination for which the student last attended',
  whetherpassedfortheexamination: 'Whether Passed for the examination',
  detailsofpendingexaminationifany: 'Details of Pending examination if any',
  whetherthestudentwasinreceiptofanyscholarshipsconcession: 'Whether the student was in receipt of any scholarships/Concession (If yes, Details)',
  whetheralldueshavebeenpaid: 'Whether all dues have been paid',
  remarks: 'Remarks'
};

export default function TCPreview({ tc,onTCDownload, onCCDownload, isDownloadingTC, isDownloadingCC }) {
  const getFormattedDate = () => new Date().toLocaleDateString('en-GB');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatMonthAndYear = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};

  const formattedData = Object.entries(fieldLabels).map(([key, label]) => ({
    label,
    value: key === 'datemonthandyearofexamination' 
          ? formatMonthAndYear(tc[key])  
          : (key.includes('date') ? formatDate(tc[key]) : tc[key])
  }));

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center mt-4 bg-white w-full mb-4">
        <h1 className="text-3xl font-bold">Preview</h1>
        <div>
          <button 
            className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
            onClick={onTCDownload}
            disabled={isDownloadingTC || isDownloadingCC}
          >
            {isDownloadingTC ? 'Downloading TC...' : 'Download TC'}
          </button>
          <button 
            className="px-2 py-1 bg-green-500 text-white rounded"
            onClick={onCCDownload}
            disabled={isDownloadingTC || isDownloadingCC}
          >
            {isDownloadingCC ? 'Downloading CC...' : 'Download CC'}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
      <div id="tc-preview-original" className="a4-page bg-white p-8 text-sm relative">
        <div className="absolute inset-4 border-4 border-black pointer-events-none"></div>
        <div className="relative z-10 flex flex-col justify-between min-h-[calc(297mm-4rem)] px-4">
          <div>
            <div className="mb-8">
              <Image 
                src="/header.png" 
                alt="Logo" 
                width={788} 
                height={100} 
                objectFit="contain"
                priority
              />
            </div>
            <div className="flex justify-between items-center mb-8">
              <div><span className="font-bold">T C No:</span> {tc['tcno']}</div>
              <div><span className="font-bold">Date:</span> {getFormattedDate()}</div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-8">TRANSFER CERTIFICATE</h2>
            <div className="grid grid-cols-1 gap-2 px-8">
              {formattedData.map(({ label, value }) => (
                <div key={label} className="flex items-center">
                  <div className="w-1/2 font-semibold break-words pr-2 text-left flex items-center min-h-[1.5em]">{label}</div>
                  <div className="w-8 text-center">:</div>
                  <div className="flex-1 pl-2 flex items-center min-h-[1.5em]">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center font-semibold">
              <p>Kochi -- 22</p>
              <p>(Office Seal)</p>
              <p>Hon. DIRECTOR</p>
            </div>
            <div className="border-t border-rose-500 mt-4 pt-1">
              <p className="text-center text-[10px]">Kochi - 682 022, Kerala, India, Email: icrep@cusat.ac.in, Mob: +91 8078019688</p>
            </div>
          </div>
        </div>
      </div>

      <div id="tc-preview-copy" className="a4-page bg-white p-8 text-sm relative block">
        <div className="absolute inset-4 border-4 border-black pointer-events-none"></div>
        <div className="relative z-10 flex flex-col justify-between min-h-[calc(297mm-4rem)] px-4">
          <div>
            <div className="mb-8">
              <Image src="/header.png" alt="Logo" width={788} height={100} />
            </div>
            <div className="flex justify-between items-center mb-8">
              <div><span className="font-bold">T C No:</span> {tc['tcno']}</div>
              <div><span className="font-bold">Date:</span> {getFormattedDate()}</div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-8">TRANSFER CERTIFICATE<span className="text-zinc-300 italic">(o/c)</span></h2>
            <div className="grid grid-cols-1 gap-2 px-8">
              {formattedData.map(({ label, value }) => (
                <div key={label} className="flex items-center">
                  <div className="w-1/2 font-semibold break-words pr-2 text-left flex items-center min-h-[1.5em]">{label}</div>
                  <div className="w-8 text-center">:</div>
                  <div className="flex-1 pl-2 flex items-center min-h-[1.5em]">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center font-semibold">
              <p>Kochi -- 22</p>
              <p>(Office Seal)</p>
              <p>Hon. DIRECTOR</p>
            </div>
            <div className="border-t border-rose-500 mt-4 pt-1">
              <p className="text-center text-[10px]">Kochi - 682 022, Kerala, India, Email: icrep@cusat.ac.in, Mob: +91 8078019688</p>
            </div>
          </div>
        </div>
      </div>
      
      <div id="conduct-certificate-original" className="mt-8">
        <ConductCertificatePreview data={tc} />
      </div>

      <div id="conduct-certificate-copy" className="mt-8">
        <ConductCertificatePreview data={tc} isCopy={true} />
      </div>
    </div>
    </div>
  );
}
