import React from 'react';
import type { License } from '../types';
import { 
  ArrowLeftIcon3D, 
  AnchorIcon3D,
  CaptainIcon3D,
  EngineerIcon3D,
  HelmIcon3D,
  CertificateIcon3D,
  LifebuoyIcon3D
} from './icons';

interface LicenseSelectionScreenProps {
  licenses: License[];
  onSelect: (license: License) => void;
  onBack: () => void;
}

const getLicenseIcon = (licenseName: string): React.ReactNode => {
    const name = licenseName.toLowerCase();
    const iconClass = "h-14 w-14 mx-auto text-indigo-500 mb-3";
    if (name.includes('thuyền trưởng')) return <CaptainIcon3D className={iconClass} />;
    if (name.includes('máy trưởng')) return <EngineerIcon3D className={iconClass} />;
    if (name.includes('thủy thủ')) return <AnchorIcon3D className={iconClass} />;
    if (name.includes('lái phương tiện')) return <HelmIcon3D className={iconClass} />;
    if (name.includes('chứng chỉ')) return <CertificateIcon3D className={iconClass} />;
    return <LifebuoyIcon3D className={iconClass} />;
};

const LicenseSelectionScreen: React.FC<LicenseSelectionScreenProps> = ({ licenses, onSelect, onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-slide-in-right">
      <div className="relative text-center mb-10">
        <button 
          onClick={onBack} 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-700/50 p-3 rounded-full shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-110"
          aria-label="Quay lại"
        >
            <ArrowLeftIcon3D className="h-10 w-10" />
        </button>
        <AnchorIcon3D className="h-20 w-20 mx-auto text-indigo-500 mb-4" />
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Chọn Hạng Bằng</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">Anh/chị vui lòng chọn hạng bằng muốn ôn tập và thi thử.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {licenses.map(license => {
            const totalQuestions = license.subjects.reduce((sum, subject) => sum + subject.questions.length, 0);
            return (
              <button
                key={license.id}
                onClick={() => onSelect(license)}
                className="group w-full p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 focus:outline-none"
              >
                {getLicenseIcon(license.name)}
                <h3 className="text-md font-bold text-indigo-700 dark:text-indigo-300">{license.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{license.subjects.length} môn - {totalQuestions} câu</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default LicenseSelectionScreen;