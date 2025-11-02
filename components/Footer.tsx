import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-4 mt-8">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
        Bản quyền © {new Date().getFullYear()} Công ty cổ phần tư vấn và giáo dục Ninh Bình.
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500">
        Địa chỉ: Đường Triệu Việt Vương, phường Hoa lư, tỉnh Ninh Bình
      </p>
       <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
        Phiên bản v2.9.8 - Chúc anh/chị ôn thi hiệu quả!
      </p>
    </footer>
  );
};

export default Footer;