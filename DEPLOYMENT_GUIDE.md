# 🚀 Love All 플랫폼 Vercel 배포 가이드

## 📋 배포 전 체크리스트

### ✅ 필수 준비사항
- [ ] GitHub 계정
- [ ] Vercel 계정
- [ ] 네이버 클라우드 플랫폼 계정
- [ ] 네이버 지도 API 클라이언트 ID

## 🗂️ 1단계: GitHub 리포지토리 생성

### 1.1 새 리포지토리 생성
1. [GitHub](https://github.com)에 로그인
2. **"New repository"** 클릭
3. 리포지토리 이름: `love-all-tennis-platform`
4. **Public** 또는 **Private** 선택
5. **"Create repository"** 클릭

### 1.2 파일 업로드
다음 파일들을 GitHub에 업로드하세요:

```
📁 love-all-tennis-platform/
├── 📄 package.json
├── 📄 next.config.js
├── 📄 tsconfig.json
├── 📄 postcss.config.js
├── 📄 tailwind.config.js
├── 📄 .env.example
├── 📄 vercel.json
├── 📄 .gitignore
├── 📄 README.md
├── 📄 App.tsx
├── 📁 components/
├── 📁 data/
├── 📁 pages/
├── 📁 public/
├── 📁 styles/
└── 📁 utils/
```

## 🌐 2단계: Vercel 배포

### 2.1 Vercel에서 프로젝트 생성
1. [Vercel](https://vercel.com)에 로그인
2. **"New Project"** 클릭
3. **"Import Git Repository"** 선택
4. GitHub에서 `love-all-tennis-platform` 리포지토리 선택
5. **"Import"** 클릭

### 2.2 프로젝트 설정
```json
{
  "name": "love-all-tennis-platform",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 2.3 환경 변수 설정
Vercel 대시보드에서 **Settings → Environment Variables** 이동:

| 변수명 | 값 | 환경 |
|--------|-----|------|
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | `your_naver_client_id` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Production |
| `NEXT_PUBLIC_APP_URL` | `https://your-app-git-main.vercel.app` | Preview |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Development |

### 2.4 도메인 설정 (선택사항)
1. **Settings → Domains** 이동
2. 커스텀 도메인 추가 (예: `love-all-tennis.com`)
3. DNS 설정 업데이트

## 🗺️ 3단계: 네이버 지도 API 설정

### 3.1 네이버 클라우드 플랫폼 설정
1. [네이버 클라우드 플랫폼](https://console.ncloud.com) 로그인
2. **AI·NAVER API → Application** 메뉴 이동
3. 애플리케이션 선택 또는 생성
4. **서비스 환경 → Web Service URL** 설정

### 3.2 웹 서비스 URL 등록
다음 URL들을 **각각 별도 줄에** 추가하세요:

#### 필수 URL 패턴
```
https://your-app-name.vercel.app
https://your-app-name.vercel.app/*
https://*.vercel.app
https://*.vercel.app/*
https://vercel.app
https://vercel.app/*
```

#### 개발용 URL (개발 시에만)
```
http://localhost:3000
http://localhost:3000/*
http://127.0.0.1:3000
http://127.0.0.1:3000/*
```

#### 커스텀 도메인 (있는 경우)
```
https://your-custom-domain.com
https://your-custom-domain.com/*
https://*.your-custom-domain.com
https://*.your-custom-domain.com/*
```

### 3.3 설정 저장 및 대기
1. **저장** 버튼 클릭
2. **5-10분 대기** (설정 반영 시간)
3. 애플리케이션에서 네이버 지도 확인

## 🚀 4단계: 배포 실행

### 4.1 자동 배포
1. Vercel에서 **"Deploy"** 클릭
2. 빌드 로그 확인
3. 배포 완료 대기 (보통 2-5분)

### 4.2 배포 URL 확인
```
Production: https://your-app-name.vercel.app
Preview: https://your-app-name-git-main.vercel.app
```

## ✅ 5단계: 배포 확인

### 5.1 기능 테스트
- [ ] 홈페이지 로딩 확인
- [ ] 네이버 지도 표시 확인
- [ ] 테니스장 마커 클릭 테스트
- [ ] 모바일 반응형 확인
- [ ] 페이지 간 네비게이션 테스트

### 5.2 성능 확인
1. [PageSpeed Insights](https://pagespeed.web.dev/) 테스트
2. Core Web Vitals 점수 확인
3. 모바일/데스크톱 성능 점수 확인

## 🔧 트러블슈팅

### 네이버 지도가 표시되지 않는 경우
1. **브라우저 개발자 도구** 열기
2. **Console** 탭에서 오류 메시지 확인
3. 일반적인 오류와 해결방법:

#### 401 Unauthorized
```
해결: 네이버 클라우드 플랫폼에서 웹 서비스 URL 재확인
- 현재 도메인이 등록되어 있는지 확인
- 와일드카드 패턴 포함여부 확인
```

#### 403 Forbidden
```
해결: 클라이언트 ID 확인
- NEXT_PUBLIC_NAVER_MAP_CLIENT_ID 환경변수 재확인
- Vercel 환경변수 설정 확인
```

#### CORS 오류
```
해결: 도메인 설정 문제
- https:// 프로토콜 사용 확인
- 서브도메인 포함 설정 확인
```

### 빌드 오류 해결
```bash
# 로컬에서 빌드 테스트
npm run build

# 타입 오류 확인
npm run type-check

# 린트 오류 확인
npm run lint
```

### 환경 변수 오류
1. Vercel 대시보드에서 환경 변수 재확인
2. 변수명 정확성 확인 (`NEXT_PUBLIC_` 접두사 필수)
3. 배포 후 재빌드 실행

## 📊 모니터링 설정

### Vercel Analytics (선택사항)
1. Vercel 대시보드에서 **Analytics** 탭 이동
2. **Enable Analytics** 클릭
3. 실시간 사용자 데이터 확인

### Error Tracking (선택사항)
1. [Sentry](https://sentry.io) 계정 생성
2. Next.js 프로젝트 연결
3. 환경 변수에 Sentry DSN 추가

## 🔄 CI/CD 설정

### 자동 배포 설정
Vercel은 GitHub 연동 시 자동으로 다음 기능을 제공합니다:

- **자동 배포**: main 브랜치 push 시
- **프리뷰 배포**: PR 생성 시
- **롤백**: 이전 버전으로 즉시 복원

### GitHub Actions (고급)
`.github/workflows/ci.yml` 파일 생성:

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run type check
      run: npm run type-check
    
    - name: Run linter
      run: npm run lint
    
    - name: Build project
      run: npm run build
```

## 📈 최적화 팁

### 성능 최적화
1. **이미지 최적화**: WebP 포맷 사용
2. **폰트 최적화**: Google Fonts preload
3. **번들 최적화**: Tree shaking 활용

### SEO 최적화
1. **메타 태그**: 각 페이지별 설정
2. **Sitemap**: 자동 생성 설정
3. **로봇 텍스트**: robots.txt 설정

## 🎉 배포 완료!

축하합니다! Love All 테니스 플랫폼이 성공적으로 배포되었습니다.

### 다음 단계
1. **도메인 연결**: 커스텀 도메인 설정
2. **분석 도구**: Google Analytics 연동
3. **사용자 피드백**: 베타 테스터 모집
4. **성능 모니터링**: 지속적인 최적화

### 지원 및 문의
- **기술 문의**: GitHub Issues
- **비즈니스 문의**: info@loveall.com
- **긴급 문의**: 02-1234-5678

---

**🚀 Happy Deploying! 🎾**