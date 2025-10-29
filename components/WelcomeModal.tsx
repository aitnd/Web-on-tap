import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, ArrowUpIcon } from './icons';

interface WelcomeModalProps {
  onStart: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollContainer.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="text-center p-4 animate-slide-in-right">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto relative">
        <SparklesIcon className="h-20 w-20 mx-auto text-indigo-500 mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Ứng dụng Ôn tập
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Chào mừng anh/chị đã đến với ứng dụng chuyên ôn thi các chứng chỉ ngành hàng hải. Cùng nhau chinh phục mọi kỳ thi nhé!
        </p>
        <button
          onClick={onStart}
          className="bg-indigo-600 text-white font-bold text-lg py-4 px-10 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 transform hover:scale-105"
        >
          Bắt đầu ngay
        </button>
        <div ref={scrollContainerRef} className="mt-8 text-sm text-left text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg max-h-[40vh] overflow-y-auto">
            <p className="font-semibold"><strong>Cập nhật phiên bản v2.7.1:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Cập nhật tiêu đề và một số văn bản để mang tính trung lập về giới tính (anh/chị).</li>
                <li>Cho phép bỏ qua màn hình nhập tên, tên mặc định sẽ là "Học viên".</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ An toàn khí hoá lỏng" với 2 môn và 40 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.6.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ An toàn hóa chất" với 2 môn và 40 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.5.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ An toàn xăng dầu" với 2 môn và 40 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.4.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ An toàn ven biển" với 2 môn và 50 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.3.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ Điều khiển phương tiện đi ven biển" với 2 môn và 200 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.2.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ Điều khiển phương tiện cao tốc" với 2 môn và 40 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.1.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ Lái phương tiện" với 6 môn và 150 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.0.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ Thợ máy" với 4 môn và 100 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.9.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Chứng chỉ Thủy thủ" với 4 môn và 170 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.8.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Thuyền trưởng hạng ba - T3" với 5 môn và 150 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.7.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Thuyền trưởng hạng nhì - T2" với 4 môn và 200 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.6.1:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Tách file dữ liệu của hạng T1 thành 2 phần (150 câu Luật và 100 câu các môn còn lại) để dễ dàng quản lý và cập nhật hơn.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.6.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Thuyền trưởng hạng nhất - T1" với 4 môn và 250 câu hỏi trắc nghiệm dựa trên tài liệu ôn thi chính thức.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.5.2:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Điều chỉnh lại thứ tự các môn học cho tất cả các hạng bằng để khớp với thứ tự trong tài liệu ôn thi chính thức.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.5.1:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Sửa lỗi sắp xếp dứt điểm: Chuyển logic sắp xếp hạng bằng và môn học về phía cơ sở dữ liệu để đảm bảo thứ tự luôn chính xác và ổn định.</li>
                <li>Sắp xếp lại các môn học theo thứ tự logic hơn.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.5.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Sửa lỗi cơ sở dữ liệu dứt điểm: Viết lại các script Supabase bằng một phương pháp mạnh mẽ hơn để đảm bảo cột <code>display_order</code> luôn được thêm vào đúng cách, khắc phục triệt để lỗi "column does not exist".</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.9:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Sửa lỗi cơ sở dữ liệu: Cập nhật các file script để đảm bảo chúng có thể chạy độc lập và tự động thêm cột <code>display_order</code>, khắc phục lỗi không thể tải dữ liệu.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.8:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Thêm tính năng sắp xếp: Các hạng bằng và môn học giờ đây sẽ hiển thị theo một thứ tự logic được định sẵn thay vì theo thứ tự chữ cái.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.7:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Máy trưởng hạng ba - M3" với 4 môn và 100 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.6:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Bổ sung bộ đề thi mới: "Máy trưởng hạng nhì - M2" với 5 môn và 130 câu hỏi trắc nghiệm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.5:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Cải thiện màn hình kết quả: thay thế nút 'Chọn hạng bằng khác' bằng các nút 'Các môn khác'/'Làm lại' (cho ôn tập) và 'Làm lại bài thi' (cho thi thử) để luồng làm bài mượt mà hơn.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.4:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Thay đổi luồng điều hướng: loại bỏ nút "Quay lại" ở màn hình chọn chế độ, thay bằng nút "Chọn lại hạng bằng" để tránh đăng xuất nhầm.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.3:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Sửa lỗi nút "Kết thúc" không hoạt động.</li>
                <li>Thêm nút "Quay lại" trong màn hình làm bài để có thể thoát ra ngoài mà không cần nộp bài.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.2:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Sửa lỗi nút "Kết thúc" không ghi nhận câu trả lời hiện tại, đảm bảo kết quả luôn chính xác.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.1:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Cải thiện nút "Kết thúc" trong bài ôn tập: nay sẽ chấm điểm và hiển thị kết quả thay vì thoát ra ngoài.</li>
                <li>Tối ưu luồng ôn tập: Sau khi xem kết quả, có thể quay lại màn hình chọn môn học trực tiếp.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.4.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Kết nối ứng dụng với cơ sở dữ liệu Supabase, sử dụng bộ đề thi thật.</li>
                <li>Thêm màn hình tải dữ liệu để cải thiện trải nghiệm người dùng.</li>
            </ul>
            <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v1.3.0:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Thêm các nút "Quay lại" trên các màn hình để điều hướng dễ dàng hơn.</li>
                <li>Thêm nút "Kết thúc" trong màn hình làm bài để có thể thoát ra ngoài.</li>
            </ul>
        </div>
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="absolute bottom-6 right-6 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 transform hover:scale-110"
            aria-label="Lên đầu trang"
          >
            <ArrowUpIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomeModal;