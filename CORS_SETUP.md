# CORS 설정 가이드

## 현재 상황
Frontend (React): `http://localhost:5173`
Backend (Server): `http://localhost:8000`

CORS 정책으로 인해 서로 다른 포트 간 통신이 차단되고 있습니다.

## 해결 방법

### 1. 백엔드 서버에서 CORS 설정 (권장)

백엔드 서버에서 다음과 같이 CORS를 설정해주세요:

```javascript
// Express.js 예시
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 2. 개발용 프록시 설정

Vite 설정 파일에 프록시를 추가할 수 있습니다:

```javascript
// vite.config.ts
export default defineConfig({
  // ... 기존 설정
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 3. 임시 해결책: 브라우저 CORS 비활성화

**개발 중에만 사용하세요:**

Chrome을 CORS 비활성화로 실행:
```bash
# Windows
chrome.exe --user-data-dir=/tmp/foo --disable-web-security

# macOS
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

# Linux
google-chrome --disable-web-security --user-data-dir="/tmp/chrome_dev_test"
```

## 현재 프론트엔드 대응

프론트엔드에서는 이미 다음과 같은 대응을 했습니다:

1. **CORS 에러 감지 및 처리**: API 호출 실패 시 친화적인 에러 메시지 표시
2. **Mock 데이터 제공**: 백엔드가 없어도 개발/테스트 가능
3. **자동 fallback**: 실제 API 호출 실패 시 mock 데이터로 자동 전환

## 테스트 방법

1. 백엔드 서버가 실행 중인 경우: 실제 API 호출
2. 백엔드 서버가 없는 경우: Mock 데이터로 자동 전환
3. 콘솔에서 현재 사용 중인 데이터 소스 확인 가능

이제 백엔드 연결 없이도 모든 기능을 테스트할 수 있습니다!