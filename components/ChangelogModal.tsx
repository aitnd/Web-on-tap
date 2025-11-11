import React from 'react';
import { XMarkIcon, InformationCircleIcon } from './icons';

interface ChangelogModalProps {
  onClose: () => void;
}

const ChangelogModal: React.FC<ChangelogModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-card text-card-foreground rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full m-4 animate-slide-in-right"
        onClick={(e) => e.stopPropagation()} // Ngăn việc click bên trong modal làm đóng modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <InformationCircleIcon className="h-6 w-6" />
            Lịch sử cập nhật
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Đóng"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="text-sm text-left text-muted-foreground max-h-[70vh] overflow-y-auto pr-2 space-y-4">
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.2.4:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Điều chỉnh thời gian làm bài của chế độ "Thi Online" từ 60 phút xuống còn 45 phút để phù hợp hơn.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.2.3:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Chỉnh sửa nội dung hiển thị trên màn hình "Thi Online" theo yêu cầu để khớp với thực tế.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.2.2:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Cập nhật biểu tượng (favicon) của ứng dụng và các logo liên quan thành hình ảnh mới.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.2.1:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Cập nhật giao diện màn hình "Thi Online" để giống hơn với ảnh mô phỏng: chia lại lưới câu hỏi, đổi màu các lựa chọn và nút bấm, thay đổi thông tin chân trang.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.2.0:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Thêm chức năng "Thi Online" với giao diện mô phỏng kỳ thi thực tế, giúp người dùng làm quen và giảm bỡ ngỡ.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.1.3:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Dọn dẹp giao diện: Loại bỏ phần thông tin cập nhật ở màn hình chào mừng để giao diện gọn gàng hơn.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.1.2:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Cập nhật hình nền cho theme "Tri Ân" với hình ảnh lớp học, tạo không khí sư phạm gần gũi và thân thuộc hơn.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.1.1:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Tinh chỉnh theme "Tri Ân": đặt làm mặc định, thêm các icon và lời chúc đặc biệt cho ngày 20-11.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.1.0:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Ra mắt Theme mới "Tri Ân" - một món quà đặc biệt kỷ niệm ngày Nhà giáo Việt Nam 20-11, với phong cách bảng xanh phấn trắng.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Phiên bản v3.0.2:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Cải tiến Footer: Giờ đây anh/chị có thể nhấn vào dòng chữ phiên bản để xem chi tiết toàn bộ lịch sử cập nhật trong một cửa sổ riêng.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Cập nhật phiên bản v3.0.1:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Sửa lỗi hiển thị: Các màn hình Ôn tập, Thi thử và Kết quả giờ đã tương thích hoàn toàn với hệ thống Theme.</li>
                    <li>Giữ font chữ mặc định ('Be Vietnam Pro') trên các màn hình làm bài để đảm bảo tính dễ đọc.</li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-foreground"><strong>Cập nhật phiên bản v3.0.0:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Thêm chức năng Theme: Giao diện ứng dụng giờ đây có thể thay đổi với 3 chủ đề độc đáo (Hiện đại, Cổ điển, Bình minh).</li>
                    <li>Người dùng có thể chọn và lưu lại chủ đề yêu thích.</li>
                    <li>Cải tiến toàn bộ kiến trúc giao diện để hỗ trợ thay đổi màu sắc, font chữ và hiệu ứng linh hoạt.</li>
                </ul>
            </div>
             <div>
                <p className="font-semibold text-foreground"><strong>Cập nhật phiên bản v2.9.9:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Bỏ chữ "(Khách)" khỏi nút "Bắt đầu".</li>
                </ul>
            </div>
            {/* ... Các mục lịch sử cập nhật cũ hơn có thể được thêm vào đây ... */}
        </div>

      </div>
    </div>
  );
};

export default ChangelogModal;