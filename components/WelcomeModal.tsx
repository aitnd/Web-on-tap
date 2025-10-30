import React from 'react';
import { HelmIcon3D, InformationCircleIcon } from './icons';

interface WelcomeModalProps {
  onStart: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart }) => {
  return (
    <div className="text-center p-4 animate-slide-in-right">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto relative">
        <HelmIcon3D className="h-24 w-24 mx-auto text-indigo-500 mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Ôn Thi Hàng Hải
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
        <div className="mt-8 text-sm text-left text-slate-500 dark:text-slate-400">
            <details className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg cursor-pointer">
                <summary className="font-semibold flex items-center gap-2">
                    <InformationCircleIcon className="h-5 w-5"/>
                    Lịch sử cập nhật (v2.9.1)
                </summary>
                <div className="mt-3 pl-2 border-l-2 border-slate-300 dark:border-slate-600 max-h-[30vh] overflow-y-auto">
                    <p className="font-semibold text-slate-600 dark:text-slate-300"><strong>Cập nhật phiên bản v2.9.1:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Sửa lỗi nghiêm trọng: Khắc phục dứt điểm lỗi nút "Nộp bài" (Thi thử) và "Trả lời" (Ôn tập) không phản hồi do quản lý state phức tạp sau khi tái cấu trúc.</li>
                        <li>Cải tiến trải nghiệm (Ôn tập): Loại bỏ nút "Trả lời", đáp án sẽ được hiển thị ngay sau khi chọn, giúp luồng ôn tập nhanh và mượt hơn.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.9.0:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Tái cấu trúc lớn: Tách biệt hoàn toàn luồng "Thi thử" và "Ôn tập" vào các thành phần giao diện riêng biệt (QuizScreen, ResultsScreen) để dễ dàng bảo trì và phát triển tính năng mới cho từng chế độ.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.8.2:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Sửa lỗi nút "Nộp bài" (Thi thử) và "Trả lời" (Ôn tập) không hoạt động đúng như mong đợi, đảm bảo mọi câu trả lời đều được ghi nhận chính xác.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.8.1:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Thi thử: Bổ sung nút "Câu trước" và "Câu tiếp" để điều hướng tuần tự qua các câu hỏi, song song với lưới câu hỏi.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.8.0:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Cải tiến chế độ Thi thử:
                            <ul className="list-[circle] list-inside ml-4">
                                <li>Đổi tên nút "Kết thúc" thành "Nộp bài".</li>
                                <li>Thêm thanh điều hướng câu hỏi, cho phép chuyển đổi và xem lại các câu đã trả lời.</li>
                                <li>Đáp án sẽ không hiển thị ngay lập tức để mô phỏng một kỳ thi thật.</li>
                            </ul>
                        </li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.9:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Sửa lỗi giao diện (lần 2): Căn chỉnh lại màn hình nhập tên triệt để, đảm bảo nút "Quay lại" không bao giờ che mất tiêu đề.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.8:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Sửa lỗi giao diện: Căn chỉnh lại màn hình nhập tên để nút "Quay lại" không che mất tiêu đề.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.7:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Đồng bộ giao diện: Tất cả các nút "Quay lại" trong ứng dụng được cập nhật theo một phong cách nhất quán, nổi bật với icon gradient màu sắc đẹp mắt.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.6:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Cải tiến giao diện: Nút "Quay lại" ở màn hình Chọn môn học được làm to, nổi bật và đẹp hơn.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.5:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Cải tiến giao diện màn hình kết quả thi thử: Làm nổi bật trạng thái "ĐẠT" / "KHÔNG ĐẠT" và trình bày lại điểm số cho trực quan, dễ hiểu hơn.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.4:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Nâng cấp toàn bộ icon trong ứng dụng sang phong cách 3D hiện đại, đẹp mắt hơn.</li>
                        <li>Màn hình kết quả: Thêm bộ lọc để xem "Tất cả" câu hỏi hoặc "Chỉ câu sai".</li>
                        <li>Màn hình kết quả thi thử: Bổ sung điểm theo thang 10 và trạng thái "Đạt" / "Không đạt".</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.3:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Sửa lỗi dữ liệu: Loại bỏ 1 câu hỏi bị trùng lặp trong môn Kinh tế vận tải của hạng Máy trưởng hạng nhất (M1).</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.2:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Cải tiến giao diện màn hình chào mừng và màn hình chọn hạng bằng theo chủ đề hàng hải.</li>
                        <li>Hiển thị tổng số câu hỏi cho mỗi hạng bằng.</li>
                    </ul>
                    <p className="font-semibold mt-3"><strong>Cập nhật phiên bản v2.7.1:</strong></p>
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
                </div>
            </details>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;