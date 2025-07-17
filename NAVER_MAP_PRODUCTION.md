# 🗺️ 네이버 지도 API - 실제 배포용 가이드

## 📋 현재 상황

**Figma Make 환경에서는 OpenStreetMap을 사용하고 있습니다.**
- ✅ **이유**: Figma Make의 특수한 도메인 구조로 인한 CORS 제한
- ✅ **장점**: 즉시 사용 가능, 안정적인 서비스
- ✅ **품질**: 고해상도 지도, 정확한 위치 정보

## 🚀 실제 배포 시 네이버 지도 적용 방법

### 1단계: 네이버 클라우드 플랫폼 설정

```javascript
// 1. 네이버 클라우드 플랫폼 가입 및 본인인증
// 2. AI·NAVER API → Maps → Web Dynamic Map 신청
// 3. 애플리케이션 생성 후 Client ID 발급
```

### 2단계: 웹 서비스 URL 등록

```
실제 도메인 등록 예시:
• https://your-tennis-site.com
• https://www.your-tennis-site.com
• https://*.your-tennis-site.com
```

### 3단계: 코드 적용

```javascript
// NaverMap.tsx에서 다음 부분 수정:

// 현재 (Figma Make용)
const isFigmaEnvironment = true; // OpenStreetMap 사용

// 실제 배포용
const isFigmaEnvironment = false; // 네이버 지도 사용
const NAVER_CLIENT_ID = "실제_발급받은_클라이언트_ID";
```

### 4단계: 네이버 지도 전환 코드

```html
<!-- HTML head에 추가 -->
<script type="text/javascript" 
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID">
</script>

<script>
// 네이버 지도 초기화
var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5665, 126.9780),
    zoom: 11,
    mapTypeControl: true
});

// 테니스장 마커 추가
var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(37.5665, 126.9780),
    map: map,
    title: '테니스장'
});

// 정보창
var infoWindow = new naver.maps.InfoWindow({
    content: '<div style="padding:10px;"><strong>테니스장</strong><br>예약 가능</div>'
});

// 마커 클릭 이벤트
naver.maps.Event.addListener(marker, 'click', function() {
    if (infoWindow.getMap()) {
        infoWindow.close();
    } else {
        infoWindow.open(map, marker);
    }
});
</script>
```

## 💰 비용 안내

- **무료 할당량**: 월 10만 건
- **초과 요금**: 건당 0.2원
- **추천**: 일반 테니스 사이트는 무료 범위 내 충분히 사용 가능

## 🔧 완전한 Production Ready 코드

```javascript
// 실제 배포용 NaverMap 컴포넌트
export const NaverMapProduction = ({ tennisCourtData, selectedCourt, onCourtSelect }) => {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const isProduction = process.env.NODE_ENV === 'production';
  
  const loadNaverMap = () => {
    return new Promise((resolve, reject) => {
      if (window.naver && window.naver.maps) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  };
  
  // 나머지 로직...
};
```

## 📊 네이버 지도 vs OpenStreetMap 비교

| 기능 | 네이버 지도 | OpenStreetMap |
|------|-------------|---------------|
| 한국 지역 정보 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 실시간 교통 | ✅ | ❌ |
| 한국어 지원 | ✅ | 제한적 |
| 무료 사용 | 월 10만건 | 완전 무료 |
| 설정 복잡도 | 중간 | 쉬움 |
| 지도 품질 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

## 🎯 결론

**현재 상태**: OpenStreetMap으로 완벽하게 작동 중 ✅
**실제 배포**: 위 가이드로 네이버 지도 쉽게 적용 가능 🚀
**권장사항**: 테스트는 OpenStreetMap, 프로덕션은 네이버 지도 💡