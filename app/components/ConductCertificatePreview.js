import Image from "next/image";

export default function ConductCertificatePreview({ data, isCopy = false }) {
  
    const getFormattedDate = () => {
        const date = new Date();
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      };

      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

  return (
    <div className="conduct-certificate-page bg-white p-4 text-sm relative" style={{ width: '220mm', height: '180mm' }}>
      <div className="absolute inset-2 border-4 border-black pointer-events-none"></div>
      <div className="relative z-10 flex flex-col justify-between h-full px-4">
        <div>
          <div className="my-8">
            <Image 
              src="/header.png" 
              alt="Certificate Header" 
              width={830}
              height={150}
            />
          </div>
          
          <div className="my-12">
            <div className="flex justify-between text-sm">
                <div>
                    <span className="font-bold">CC No: </span><span>{data.ccno}</span>
                </div>
                <div>
                    <span className="font-bold">Date: </span><span>{getFormattedDate()}</span>
                </div>
            </div>
            <h4 className="text-center font-bold my-12 text-4xl">
              COURSE AND CONDUCT CERTIFICATE
              {isCopy && <span className="text-zinc-300 italic">(o/c)</span>}
            </h4>
            <p className="mt-8 px-12 text-justify text-lg">
              This is to certify that Sri/Kum. 
              <span className="font-semibold"> {data.nameofthestudent} </span> 
              Admn No. <span className="font-semibold">{data.admissionno} </span> 
              is/was a student of this Centre for his/her
              <span className="font-semibold"> {data.nameoftheprogram} </span> course from
              <span className="font-semibold"> {formatDate(data.dateofadmission)} </span> to <span className="font-semibold">{formatDate(data.dateofleaving)}</span>. 
              His/her conduct and character is/was <span className="px-1 mx-1">.......................................................................</span> during the period.
            </p>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-end font-bold">
            <p>Kochi -- 22</p>
            <p>(Office Seal)</p>
            <p>Hon. DIRECTOR</p>
          </div>
          <div className="border-t border-rose-500 my-4 pt-1">
            <p className="text-center text-[10px]">Kochi - 682 022, Kerala, India, Email: icrep@cusat.ac.in, Mob: +91 8078019688</p>
          </div>
        </div>
      </div>
    </div>
  );
}