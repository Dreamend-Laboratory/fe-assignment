# KOBIS Open API 가이드

이 가이드는 영화진흥위원회(KOBIS)에서 제공하는 Open API를 사용하는 방법을 안내합니다.

## 1. KOBIS Open API 소개
- 영화진흥위원회에서 제공하는 영화 정보 API입니다.
- 누구나 무료로 사용 가능합니다.
- 일일 호출 제한: 3,000회 (초과 시 서비스 이용이 제한될 수 있습니다.)

## 2. API 키 발급 방법
1. [KOBIS Open API 사이트](https://www.kobis.or.kr/kobisopenapi)에 접속합니다.
2. 회원가입 및 로그인을 진행합니다.
3. 상단 메뉴의 "키 발급/관리" 메뉴에서 API 키를 발급받습니다.
4. 발급받은 키는 프로젝트의 환경변수로 설정하여 사용합니다.

## 3. 환경변수 설정
Vite를 사용하는 프로젝트에서는 다음과 같이 `.env` 파일을 생성하여 API 키를 관리합니다.

```
# .env 파일 생성
VITE_KOBIS_API_KEY=발급받은_API_키
```

프로젝트 내에서 다음과 같이 사용할 수 있습니다.

```typescript
// 사용 예시
const API_KEY = import.meta.env.VITE_KOBIS_API_KEY;
```

> **주의**: `.env` 파일은 민감한 정보를 포함할 수 있으므로 `.gitignore`에 추가하여 GitHub 등의 원격 저장소에 올리지 않도록 주의하세요.

## 4. 사용할 API 목록

| API | 용도 | 문서 링크 |
|-----|------|-----------|
| 일별 박스오피스 | 메인 페이지 | KOBIS 공식 문서 참조 |
| 주간/주말 박스오피스 | 메인 페이지 탭 | KOBIS 공식 문서 참조 |
| 영화 목록 | 검색 페이지 | KOBIS 공식 문서 참조 |
| 영화 상세정보 | 상세 페이지 | KOBIS 공식 문서 참조 |

## 5. 기본 API 엔드포인트
Base URL: `http://www.kobis.or.kr/kobisopenapi/webservice/rest`

| API | 엔드포인트 |
|-----|------------|
| 일별 박스오피스 | /boxoffice/searchDailyBoxOfficeList.json |
| 주간 박스오피스 | /boxoffice/searchWeeklyBoxOfficeList.json |
| 영화 목록 | /movie/searchMovieList.json |
| 영화 상세정보 | /movie/searchMovieInfo.json |

## 6. 공식 문서
API 상세 스펙(요청 파라미터, 응답 형식 등)은 아래 공식 문서 페이지에서 확인하세요.

**KOBIS Open API 서비스 정보**  
https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do

- 각 API의 요청 파라미터(필수/선택)와 응답 형식은 공식 문서를 참조하여 구현하세요.

## 7. 팁
- API 응답 구조를 먼저 파악한 후 TypeScript 인터페이스(또는 타입)를 정의하세요.
- Postman이나 브라우저에서 먼저 API를 테스트하여 데이터 구조를 확인해보세요.
- 일일 호출 제한(3,000회)이 있으므로, 불필요한 API 호출을 최소화하는 것이 좋습니다.
