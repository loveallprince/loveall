# 네이버 지도 API 연동 가이드

러브올(Love All) 웹사이트에서 네이버 지도 API를 사용하기 위한 설정 가이드입니다.

## 🚀 네이버 지도 API 연동 과정

### 1. 네이버 클라우드 플랫폼 가입
- [네이버 클라우드 플랫폼](https://www.ncloud.com/) 접속
- 회원가입 후 로그인

### 2. Maps API 서비스 신청
1. **콘솔** > **AI·NAVER API** > **Maps** 메뉴 접속
2. **이용 신청하기** 클릭
3. **Web Dynamic Map 2.0** 서비스 선택
4. 이용약관 동의 후 신청 완료

### 3. Application 등록
1. **Application** 탭에서 **Application 등록** 클릭
2. Application 정보 입력:
   - **Application 이름**: 러브올 테니스 지도
   - **서비스 환경**: WEB
   - **서비스 URL**: 배포할 도메인 (예: https://loveall.tennis)
3. **등록** 클릭하여 Client ID 발급 받기

### 4. 코드에 Client ID 적용

#### 4-1. public/index.html 수정
```html
<!-- 기존 코드 -->
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_NAVER_MAP_CLIENT_ID"></script>

<!-- 수정 후 코드 -->
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=발급받은_CLIENT_ID"></script>
```

#### 4-2. components/NaverMap.tsx 수정
```typescript
// 기존 코드 (37번째 줄 근처)
script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_NAVER_MAP_CLIENT_ID`;

// 수정 후 코드
script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=발급받은_CLIENT_ID`;
```

### 5. 환경변수 설정 (권장)
보안을 위해 환경변수로 Client ID를 관리하는 것을 권장합니다.

#### 5-1. .env 파일 생성
```bash
# .env
REACT_APP_NAVER_MAP_CLIENT_ID=발급받은_CLIENT_ID
```

#### 5-2. 코드 수정
```typescript
// components/NaverMap.tsx
const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID || 'YOUR_NAVER_MAP_CLIENT_ID';
script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
```

```html
<!-- public/index.html에서는 환경변수 직접 사용 불가하므로 빌드 시 교체 -->
```

## 📋 API 사용량 및 요금

### 무료 제공량
- **Web Dynamic Map 2.0**: 월 100,000건까지 무료
- 초과 시 건당 0.5원

### 사용량 모니터링
1. 네이버 클라우드 플랫폼 콘솔 접속
2. **AI·NAVER API** > **Maps** > **이용현황** 에서 확인

## 🔧 개발 환경 설정

### 로컬 개발 시 주의사항
- `localhost` 또는 `127.0.0.1`은 개발 시에만 사용 가능
- 실제 배포 시에는 등록한 도메인에서만 동작

### 도메인 등록
1. **Application** 설정에서 **서비스 URL** 추가
2. 개발: `http://localhost:3000`
3. 배포: `https://yourdomain.com`

## 🚨 트러블슈팅

### 1. 지도가 표시되지 않는 경우
- 브라우저 개발자 도구 Console 확인
- Client ID가 올바른지 확인
- 등록된 도메인과 현재 도메인이 일치하는지 확인

### 2. "Uncaught ReferenceError: naver is not defined" 오류
- 네이버 지도 API 스크립트가 로드되지 않음
- 네트워크 연결 상태 확인
- Client ID 유효성 확인

### 3. "Maps API requests from referer are blocked" 오류
- 등록되지 않은 도메인에서 접근 시 발생
- Application 설정에서 해당 도메인 추가 필요

## 📱 모바일 지원

네이버 지도 API는 모바일 브라우저도 지원합니다:
- iOS Safari, Chrome
- Android Chrome, Samsung Internet
- 터치 제스처 지원 (확대/축소, 드래그)

## 🌟 추가 기능

현재 구현된 기능:
- ✅ 지도 표시 및 마커 생성
- ✅ 정보창(InfoWindow) 표시
- ✅ 마커 클릭 이벤트
- ✅ 지도 중심 이동 및 줌 설정
- ✅ 반응형 디자인 지원

향후 추가 가능한 기능:
- 🔄 실시간 위치 추적 (Geolocation API)
- 🛣️ 경로 검색 (Directions API)
- 📍 주소 검색 (Geocoding API)
- 🚌 대중교통 정보 표시
- 📊 히트맵 표시

## 📞 지원

네이버 지도 API 관련 문의:
- [네이버 클라우드 플랫폼 고객지원](https://www.ncloud.com/support)
- [Maps API 개발가이드](https://navermaps.github.io/maps.js.ncp/)
- [Maps API 레퍼런스](https://navermaps.github.io/maps.js.ncp/docs/)

## 🔒 보안 주의사항

1. **Client ID 보안**
   - 환경변수 사용 권장
   - 공개 저장소에 Client ID 노출 금지

2. **도메인 제한**
   - 반드시 사용할 도메인만 등록
   - 와일드카드 사용 시 보안 위험 증가

3. **사용량 모니터링**
   - 정기적인 사용량 확인
   - 비정상적 트래픽 감지 시 즉시 대응
```

<figma type="summary">
네이버 지도 API를 성공적으로 연동했습니다. 실제 지도가 표시되고 테니스장 위치에 인터랙티브한 마커가 표시되며, 마커 클릭 시 상세 정보가 담긴 정보창이 나타나도록 구현했습니다.

다음 단계로 시도해볼 수 있는 기능들:
• 네이버 클라우드 플랫폼에서 실제 API 키를 발급받아 연동하여 실제 지도 표시
• 사용자 현재 위치 기반 가까운 테니스장 추천 기능 추가
• 테니스장까지의 경로 안내 및 대중교통 정보 표시 기능 구현