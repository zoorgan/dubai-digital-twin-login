import axios from 'axios';

// 1. إنشاء نسخة مخصصة من axios بإعدادات عامة
const api = axios.create({
    baseURL: 'https://your-backend-api.com', // رابط الـ API بتاعك
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Interceptor للطلبات الرايحة (Request Interceptor)
// وظيفته يحط الـ Access Token في الهيدر تلقائياً قبل ما الطلب يخرج
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // أو من الـ State/Context
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Interceptor للاستجابة الراجعة (Response Interceptor)
// وظيفته يلقط لو التوكن مات (خطأ 401) ويتصرف فوراً
api.interceptors.response.use(
    (response) => response, // لو الطلب نجح ورجع عادي عّديه
    async (error) => {
        const originalRequest = error.config;

        // لو السيرفر رجع 401 والطلب ده محاولناش نجدده قبل كده (_retry)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // نعلّم على الطلب ده إننا بنحاول نجدده دلوقتي عشان ندخلش في loop

            try {
                // هنجيب الـ Refresh Token المحفوظ
                const refreshToken = localStorage.getItem('refreshToken');
                
                // نبعت طلب سريع للباك إند نطلب Access Token جديد
                const res = await axios.post('https://your-backend-api.com/auth/refresh', {
                    refreshToken: refreshToken
                });

                if (res.status === 200) {
                    const newAccessToken = res.data.accessToken;

                    // حفظ التوكن الجديد في الـ localStorage
                    localStorage.setItem('accessToken', newAccessToken);

                    // تحديث الهيدر بتاع الطلب الأصلي اللي كان واقف في الكمين بالتوكن الجديد
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // إعادة تنفيذ الطلب الأصلي تاني وتمريره للمستخدم بنجاح!
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // لو حتى الـ Refresh Token ميت ومنتهي الصلاحية (مثلاً بقاله شهر ما فتحش)
                // هنا بنمسح كل حاجة ونحوله لصفحة الـ Login يكتب الباسورد من جديد
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/'; 
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;