# 한국 영화 정보 플랫폼 (Korean Movie Platform)

KOBIS Open API를 활용한 한국 영화 정보 웹 애플리케이션 개발 과제입니다.

## 1. 과제 개요
- **프로젝트명**: 한국 영화 정보 플랫폼
- **목표**: KOBIS Open API를 활용한 영화 정보 웹 애플리케이션 개발
- **기간**: 1주일
- **평가 방식**: GitHub 커밋 내역을 통한 개발 과정 및 코드 퀄리티 확인

## 2. 기술 스택 (필수)
- **React 18+**
- **TypeScript** (필수)
- **Vite** (빌드 도구)
- **Jotai** (상태 관리)
- **Tailwind CSS** (스타일링)
- **shadcn/ui** (UI 컴포넌트 라이브러리, 권장)
- **Biome** (코드 품질 - 기본 설정 사용)
- **React Router** (라우팅)

## 3. 권장 패키지 리스트
- `react-router-dom`: 애플리케이션 라우팅 구성
- `jotai`: 클라이언트 사이드 상태 관리
- `axios` 또는 `ky`: HTTP 클라이언트 통신 (선택)
- `date-fns`: 날짜 및 시간 데이터 처리
- `@tanstack/react-query`: 서버 상태 관리 및 데이터 페칭 (선택)
- `lucide-react`: 아이콘 라이브러리

## 4. 주요 기능 요약
- **박스오피스 페이지 (메인)**: 일별/주간 박스오피스 순위 표시
- **영화 검색 페이지**: 제목, 감독 등 다양한 조건으로 영화 검색
- **영화 상세 페이지**: 선택한 영화의 상세 정보(개봉일, 장르, 출연진 등) 확인
- **즐겨찾기 페이지**: 관심 있는 영화를 저장하고 관리
- **반응형 디자인**: 모바일 및 데스크톱 환경 모두 최적화된 UI/UX 제공

## 5. 디자인 참고
`design-sample/` 폴더에 16개의 화면 목업(데스크톱/모바일)이 포함되어 있습니다.
- 01~02: 박스오피스
- 03~04: 영화 검색
- 05~06: 영화 상세
- 07~08: 즐겨찾기
- 09~16: 선택 기능 (영화인 검색, 영화 비교, 통계, 최근 본 영화)

## 6. 제출 방법

### 6.1 저장소 클론
```bash
git clone https://github.com/Dreamend-Laboratory/fe-assignment.git
cd fe-assignment
```

### 6.2 본인 브랜치 생성
브랜치명은 `feature/{본인이름}` 형식으로 생성합니다.
```bash
git checkout -b feature/홍길동
```

### 6.3 프로젝트 초기화
클론한 폴더 내에서 새 Vite 프로젝트를 생성합니다.
```bash
npm create vite@latest . -- --template react-ts
npm install
npm run dev
```

### 6.4 작업 및 커밋
- 작업 과정이 잘 드러나도록 **수시로 커밋**을 남겨주세요.
- 커밋 메시지는 명확하게 작성합니다. (예: `feat: 박스오피스 페이지 구현`)

```bash
git add .
git commit -m "feat: 기능 설명"
git push origin feature/홍길동
```

### 6.5 Pull Request 생성
1. [GitHub 저장소](https://github.com/Dreamend-Laboratory/fe-assignment)에 접속
2. **Pull requests** 탭 클릭
3. **New pull request** 버튼 클릭
4. `base: main` ← `compare: feature/홍길동` 선택
5. PR 제목과 설명 작성 후 **Create pull request** 클릭

### 6.6 PR 작성 시 포함 사항
- 구현한 기능 목록
- 실행 방법 (`npm install` → `npm run dev`)
- 본인이 구현한 주요 로직에 대한 설명
- (선택) 스크린샷 또는 데모 GIF

## 7. 문의
- 과제 진행 중 궁금한 점이나 기술적인 문제는 언제든 질문 가능합니다.

## 8. 관련 문서 링크
- [상세 요구사항](./REQUIREMENTS.md)
- [API 가이드](./API_GUIDE.md)
- [화면 디자인](./design-sample/)
