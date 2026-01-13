# 리팩토링 정리

## 코드 정리 기준

사용하지 않는 코드라도 의도가 명확하고 나중에 다시 쓸 가능성이 있으면 남겨둠.
반대로 왜 있는지 모르겠거나, 현재 구조랑 안 맞아서 헷갈리게 하는 코드는 삭제함.

## 삭제한 것

### MobileMenu.tsx

어디서도 안 쓰고 있었음. index.ts에서 export도 안 하고 있었고, 실제로 모바일 네비게이션은 BottomNav가 하고 있어서 삭제함.

## 남겨둔 것

### console.error

에러 로깅은 나중에 디버깅할 때 필요하니까 그대로 둠.

### FavoriteButton의 Heart variant

지금은 star만 쓰지만 heart도 언제 쓸지 모르니까 냅둠. 몇 줄 안 되기도 하고.

### Header랑 BottomNav의 navItems

둘 다 비슷한 배열 정의해서 쓰는데, 라벨이 다름 (데스크톱은 "영화 검색", 모바일은 "검색"). 일부러 이렇게 한 거라 공통화 안 함.

## 기타 수정

- biome.json에 `tailwindDirectives: true` 추가해서 CSS 파싱 에러 해결
- useCallback으로 함수 감싸서 lint 경고 수정
