# Love All - 전국 테니스장 통합 플랫폼

## 🎾 프로젝트 소개

Love All은 전국 공공 테니스장 정보와 테니스 모임을 제공하는 프리미엄 플랫폼입니다. 네이버 지도 API를 활용한 실시간 테니스장 검색, 예약, 그리고 테니스 커뮤니티 기능을 제공합니다.

## ✨ 주요 기능

### 🗺️ 지도 서비스
- **네이버 지도 API** 연동으로 정확한 테니스장 위치 표시
- **실시간 검색** 및 필터링 (지역, 코트 타입, 시설)
- **상세 정보** 팝업 (운영시간, 연락처, 시설 정보)
- **원클릭 예약** 연결

### 👥 커뮤니티
- **테니스 모임** 생성 및 참여
- **프로 코치 서비스** 예약
- **리뷰 시스템** (테니스장 및 모임 후기)
- **실시간 채팅** 및 알림

### 👑 프리미엄 서비스
- **무제한 예약** (월 2,000원)
- **우선 예약권** 및 할인 혜택
- **개인 맞춤 추천** 서비스
- **프로 레슨 특가** 이용

## 🚀 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS v4, Radix UI
- **Maps**: Naver Maps API, Leaflet (fallback)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/love-all-tennis-platform.git
cd love-all-tennis-platform
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.example` 파일을 `.env.local`로 복사하고 필요한 값들을 입력하세요:

```bash
cp .env.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. 개발 서버 실행
```bash
npm run dev
```

http://localhost:3000에서 애플리케이션을 확인할 수 있습니다.

## 🌐 배포

### Vercel 배포
1. [Vercel](https://vercel.com)에 로그인
2. GitHub 저장소를 연결
3. 환경 변수 설정:
   - `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`: 네이버 지도 API 클라이언트 ID
   - `NEXT_PUBLIC_APP_URL`: 배포된 도메인 URL
4. 자동 배포 완료

## 🗺️ 네이버 지도 API 설정

### 1. 네이버 클라우드 플랫폼 설정
1. [네이버 클라우드 플랫폼](https://console.ncloud.com) 가입
2. **AI·NAVER API → Application** 메뉴로 이동
3. **지도 API** 신청 및 애플리케이션 생성
4. **웹 서비스 URL** 설정:
   ```
   https://your-domain.vercel.app
   https://*.vercel.app
   http://localhost:3000
   ```

### 2. API 키 환경 변수 설정
```env
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_client_id_here
```

## 📱 반응형 디자인

- **Desktop**: 1200px 이상
- **Tablet**: 768px - 1199px
- **Mobile**: 767px 이하

모든 기능이 모바일에서도 완벽하게 작동합니다.

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Green (#16a34a)
- **Secondary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### 타이포그래피
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Font Sizes**: 12px ~ 48px (responsive)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 📊 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 분할**: Dynamic imports 및 lazy loading
- **SEO 최적화**: Meta tags, sitemap, robots.txt
- **캐싱**: Static 페이지 캐싱 및 ISR

## 🧪 테스트

```bash
# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 빌드 테스트
npm run build
```

## 📂 프로젝트 구조

```
├── components/          # React 컴포넌트
│   ├── ui/             # 재사용 가능한 UI 컴포넌트
│   └── figma/          # Figma 특화 컴포넌트
├── data/               # 정적 데이터
├── pages/              # Next.js 페이지
├── public/             # 정적 파일
├── styles/             # 스타일 파일
└── utils/              # 유틸리티 함수
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

- **이메일**: info@loveall.com
- **전화**: 02-1234-5678
- **GitHub**: https://github.com/yourusername/love-all-tennis-platform

## 🙏 감사의 말

- [네이버 클라우드 플랫폼](https://www.ncloud.com) - 지도 API 제공
- [Vercel](https://vercel.com) - 호스팅 플랫폼
- [Tailwind CSS](https://tailwindcss.com) - 스타일링 프레임워크
- [Radix UI](https://radix-ui.com) - 접근성 높은 UI 컴포넌트

---

**Made with 💚 by Love All Team**