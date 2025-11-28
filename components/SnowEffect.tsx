import React, { useEffect } from 'react';

const SnowEffect: React.FC = () => {
  useEffect(() => {
    // Tạo thẻ link để nhúng CSS từ nguồn bên ngoài
    const link = document.createElement('link');
    // Thêm https: để đảm bảo tải được tài nguyên nếu chạy ở môi trường local hoặc production
    link.href = 'https://theme.hstatic.net/1000033225/1000439156/14/global-xmas2018.css?v=170';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';
    link.id = 'external-xmas-css';

    // Thêm vào thẻ <head> của trang web
    document.head.appendChild(link);

    // Hàm dọn dẹp: Gỡ bỏ thẻ link khi component bị hủy (ví dụ: khi đổi theme)
    return () => {
      const existingLink = document.getElementById('external-xmas-css');
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink);
      }
    };
  }, []);

  // Component này không render gì ra giao diện chính, chỉ tác động vào <head>
  return null;
};

export default SnowEffect;