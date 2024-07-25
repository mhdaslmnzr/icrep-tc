import Image from "next/image"

export default function TCPreview({ tc }) {
  const getFormattedDate = () => new Date().toLocaleDateString('en-GB')

  const fieldLabels = {
    nameofthestudent: 'Name of the Student (In Block letters)',
    admissionno: 'Admission No.',
    studentid: 'Student ID',
    dateofbirth: 'Date of Birth',
    gender: 'Gender',
    religionandcaste: 'Religion and Caste',
    dateofadmission: 'Date of Admission',
    nameoftheprogram: 'Name of the Program',
    dateofleaving: 'Date of Leaving',
    reasonforleaving: 'Reason for Leaving',
    classinwhichstudied: 'Class in which studied',
    whetherqualifiedforpromotion: 'Whether qualified for promotion',
    detailsofuniversityexaminationattended: 'Details of University Examination Attended',
    regnoofexamination: 'Reg.No. of Examination',
    datemonthandyearofexamination: 'Date/Month and year of examination',
    nameoftheuniversityexaminationforwhichthestudentlastattended: 'Name of the University Examination for which the student last attended',
    whetherpassedfortheexamination: 'Whether Passed for the examination',
    detailsofpendingexaminationifany: 'Details of Pending examination if any',
    whetherthestudentwasinreceiptofanyscholarshipsconcession: 'Whether the student was in receipt of any scholarships/Concession (If yes, Details)',
    whetheralldueshavebeenpaid: 'Whether all dues have been paid',
    remarks: 'Remarks'

  }


  return (
    <div className="a4-page bg-white p-8 text-sm relative">
      {/* Border */}
      <div className="absolute inset-4 border-4 border-black pointer-events-none"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-[calc(297mm-4rem)]">
        <div className="mb-4">
          <Image src="/header.png" alt="Logo" width={788} height={100} />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div><span className="font-bold">T C No:</span> {tc['tcno']}</div>
          <div><span className="font-bold">Date:</span> {getFormattedDate()}</div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">TRANSFER CERTIFICATE</h2>

        <div className="grid grid-cols-1 gap-2">
          {Object.entries(fieldLabels).map(([key, label]) => (
            <div key={key} className="flex items-center">
              <div className="w-1/2 font-semibold break-words pr-2 text-left flex items-center">
                {label}
                <span className="mx-2">:</span>
              </div>
              <div className="w-1/2 pl-2 flex items-center min-h-[2em]">{tc[key]}</div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="mt-28 flex justify-between items-center">
            <p>Kochi -- 22</p>
            <p>(Office Seal)</p>
            <p>Hon. DIRECTOR</p>
          </div>

          <div className="border-t border-rose-500 mt-4 pt-2">
            <p className="text-center text-xs">
              Kochi - 682 022, Kerala, India, Email: icrep@cusat.c.in, Mob: +91 8078019688
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
