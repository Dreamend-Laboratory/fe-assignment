# 리팩토링 정리

## 코드 정리 기준

- **남기는 경우**: 현재 사용하지 않더라도 구현 의도가 명확하고 나중에 재사용할 가능성이 있는 코드
- **삭제하는 경우**: 왜 있는지 설명하기 어렵거나, 현재 구조와 맞지 않아 혼란을 주는 코드, 테스트/임시 확인용 코드

---

## 삭제한 파일

### `src/components/common/MobileMenu.tsx`

슬라이드 방식의 모바일 메뉴 컴포넌트였는데

1. `src/components/common/index.ts`에서 export하지 않고 있습니다.
2. 프로젝트 전체에서 import하는 곳이 없습니다.
3. 현재 모바일 네비게이션은 `BottomNav.tsx`가 담당하고 있습니다.

BottomNav로 방향이 바뀌면서 더 이상 필요없어진 코드로 보이는 이유로 삭제 하였습니다.

---

## 남겨둔 코드

### 1. console.error (BoxOfficePage, MovieDetailPage, SearchPage)

```ts
// BoxOfficePage.tsx:52
console.error('박스오피스 데이터 로드 실패:', err);

// MovieDetailPage.tsx:45
console.error('영화 상세 정보 로드 실패:', err);

// SearchPage.tsx:96
console.error('영화 검색 실패:', err);
```

API 에러 발생 시 콘솔에 로그를 남기는 코드. 운영 환경에서 문제 추적할 때 필요하고 나중에 Sentry 같은 에러 리포팅 붙일 때 기반이 되므로 유지하였습니다.

### 2. FavoriteButton의 Heart variant

```ts
// FavoriteButton.tsx
import { Heart, Star } from 'lucide-react';
// ...
const Icon = variant === 'star' ? Star : Heart;
```

`variant="star"`만 사용 중이지만 heart 옵션도 구현되어 있고 UI 기획 변경 시 바로 쓸 수 있는 것과 동시에 코드량이 적어서 유지하였습니다.

## 주석 처리한 코드

X

---

## 기타 수정사항

| 파일 | 수정 내용 |
|------|----------|
| `biome.json` | `tailwindDirectives: true` 추가 (CSS에서 @apply, @theme 등 Tailwind 문법 파싱 에러 해결) |
| `src/index.css` | biome 포맷팅 적용 (font-family 줄바꿈) |
| `BoxOfficePage.tsx` | fetchBoxOffice를 useCallback으로 감싸서 의존성 경고 해결 |
| `MovieDetailPage.tsx` | fetchMovie를 useCallback으로 감싸서 의존성 경고 해결 |
| `SearchPage.tsx` | searchMovies를 useCallback으로 감싸서 의존성 경고 해결 |
