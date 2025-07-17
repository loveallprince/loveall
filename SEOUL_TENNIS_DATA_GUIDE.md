# 서울시 공공 테니스장 데이터 수집 가이드

서울시 공공예약 사이트에서 테니스장 정보를 수집하는 방법과 데이터 활용 가이드입니다.

## 🎯 데이터 수집 대상

### 서울시 공공예약 사이트 (https://yeyak.seoul.go.kr/web/main.do)
- 서울시 운영 공공 테니스장
- 구청 및 관련 기관 운영 테니스장
- 실시간 예약 현황 및 요금 정보

## 📊 수집 가능한 데이터

### 기본 정보
- **테니스장명**: 시설의 정식 명칭
- **주소**: 도로명 주소
- **연락처**: 관리 기관 전화번호
- **운영시간**: 개장/폐장 시간
- **관리기관**: 운영 주체 (구청, 공단 등)

### 시설 정보
- **코트 정보**: 코트 수, 코트 타입 (하드/클레이/인조잔디)
- **부대시설**: 주차장, 샤워실, 매점, 화장실 등
- **조명시설**: 야간 운영 여부
- **접근성**: 대중교통, 주차 시설

### 예약 정보
- **예약 방법**: 온라인/전화 예약 여부
- **예약 기간**: 사전 예약 가능 기간
- **이용 요금**: 시간대별 요금 정보
- **취소 정책**: 취소 및 환불 규정

## 🔧 데이터 수집 방법

### 1. 수동 데이터 수집
```javascript
// 현재 구현된 방식 - 공개된 정보를 기반으로 한 수동 입력
const seoulTennisCourts = [
  {
    id: 'seoul_01',
    name: '올림픽공원 테니스장',
    address: '서울특별시 송파구 올림픽로 424',
    phone: '02-410-1114',
    // ... 기타 정보
  }
];
```

### 2. 웹 스크래핑 (자동화)
```javascript
// 주의: 로봇 배제 표준(robots.txt) 확인 필요
// 서울시 공공예약 사이트 이용약관 준수 필요

const puppeteer = require('puppeteer');

async function scrapeTennisData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 1. 메인 페이지 접속
  await page.goto('https://yeyak.seoul.go.kr/web/main.do');
  
  // 2. 테니스장 검색
  await page.type('#searchKeyword', '테니스');
  await page.click('#searchBtn');
  
  // 3. 데이터 추출
  const tennisData = await page.evaluate(() => {
    const facilities = document.querySelectorAll('.facility-item');
    return Array.from(facilities).map(facility => ({
      name: facility.querySelector('.facility-name')?.textContent,
      address: facility.querySelector('.facility-address')?.textContent,
      phone: facility.querySelector('.facility-phone')?.textContent,
      // ... 기타 정보 추출
    }));
  });
  
  await browser.close();
  return tennisData;
}
```

### 3. API 연동 (권장)
```javascript
// 서울시 공공데이터 API 사용 (가능한 경우)
const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://data.seoul.go.kr/api/tennis-facilities';

async function fetchTennisData() {
  try {
    const response = await fetch(`${API_URL}?apiKey=${API_KEY}`);
    const data = await response.json();
    return data.facilities.map(facility => ({
      id: facility.id,
      name: facility.name,
      address: facility.address,
      // ... 데이터 매핑
    }));
  } catch (error) {
    console.error('API 요청 실패:', error);
    return [];
  }
}
```

## 🤖 자동화 스크립트

### 데이터 수집 스크립트
```bash
# 필요한 패키지 설치
npm install puppeteer cheerio axios

# 스크립트 실행
node scripts/scrape-tennis-data.js
```

### 데이터 검증 스크립트
```javascript
// scripts/validate-tennis-data.js
function validateTennisData(data) {
  const required = ['name', 'address', 'phone', 'lat', 'lng'];
  
  return data.filter(court => {
    const isValid = required.every(field => court[field]);
    if (!isValid) {
      console.warn(`유효하지 않은 데이터: ${court.name}`);
    }
    return isValid;
  });
}
```

## 📍 좌표 정보 수집

### 네이버 지도 API를 이용한 좌표 변환
```javascript
// 주소를 좌표로 변환
async function geocodeAddress(address) {
  const response = await fetch(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`, {
    method: 'GET',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': 'YOUR_CLIENT_ID',
      'X-NCP-APIGW-API-KEY': 'YOUR_CLIENT_SECRET'
    },
    params: {
      query: address
    }
  });
  
  const data = await response.json();
  if (data.addresses && data.addresses.length > 0) {
    return {
      lat: parseFloat(data.addresses[0].y),
      lng: parseFloat(data.addresses[0].x)
    };
  }
  return null;
}
```

## 🔄 데이터 업데이트

### 정기 업데이트 스케줄
```javascript
// 매일 새벽 2시에 데이터 업데이트
const cron = require('node-cron');

cron.schedule('0 2 * * *', async () => {
  console.log('테니스장 데이터 업데이트 시작...');
  
  try {
    const newData = await scrapeTennisData();
    const validData = validateTennisData(newData);
    
    // 데이터베이스 업데이트
    await updateTennisDatabase(validData);
    
    console.log('데이터 업데이트 완료');
  } catch (error) {
    console.error('데이터 업데이트 실패:', error);
  }
});
```

## ⚖️ 법적 고려사항

### 데이터 수집 시 준수사항
1. **저작권 준수**: 공공데이터는 일반적으로 자유이용 가능
2. **로봇 배제 표준**: robots.txt 파일 확인 필수
3. **서버 부하 방지**: 적절한 요청 간격 유지
4. **이용약관 확인**: 해당 사이트 이용약관 준수

### 권장 수집 방법
```javascript
// 서버 부하를 고려한 점진적 데이터 수집
async function collectDataGradually() {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  for (let i = 0; i < addresses.length; i++) {
    const data = await fetchCourtData(addresses[i]);
    processData(data);
    
    // 1초 대기 (서버 부하 방지)
    await delay(1000);
  }
}
```

## 📝 데이터 활용 예시

### 1. 실시간 예약 현황 표시
```javascript
// 예약 가능 시간대 표시
function displayAvailableSlots(courtId) {
  const slots = getAvailableSlots(courtId);
  return slots.map(slot => ({
    time: slot.time,
    available: slot.available,
    price: slot.price
  }));
}
```

### 2. 개인화된 추천 시스템
```javascript
// 사용자 위치 기반 추천
function recommendNearbyTennis(userLocation) {
  return tennisData
    .map(court => ({
      ...court,
      distance: calculateDistance(userLocation, court.location)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);
}
```

## 🔍 데이터 품질 관리

### 데이터 정확성 검증
```javascript
// 전화번호 형식 검증
function validatePhoneNumber(phone) {
  const phoneRegex = /^02-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phone);
}

// 주소 형식 검증
function validateAddress(address) {
  return address.startsWith('서울특별시') && address.length > 10;
}
```

### 중복 데이터 제거
```javascript
// 중복 제거 로직
function removeDuplicates(data) {
  const unique = new Map();
  
  data.forEach(court => {
    const key = `${court.name}_${court.address}`;
    if (!unique.has(key)) {
      unique.set(key, court);
    }
  });
  
  return Array.from(unique.values());
}
```

## 🚀 향후 개선 방향

### 1. 실시간 데이터 연동
- 웹소켓을 이용한 실시간 예약 현황 업데이트
- 예약 대기열 기능 구현

### 2. 데이터 확장
- 날씨 정보와 연동
- 주변 편의시설 정보 추가
- 사용자 리뷰 데이터 통합

### 3. 성능 최적화
- 데이터 캐싱 전략
- CDN 활용
- 압축 및 최적화

## 📞 문의 및 지원

데이터 수집과 관련된 기술적 문의:
- 서울시 공공데이터 담당부서: 02-120
- 서울시 공공예약 시스템 지원: support@seoul.go.kr

**주의사항**: 실제 운영 시에는 해당 기관의 사전 승인을 받고 이용약관을 준수해야 합니다.