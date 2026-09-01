# mo-juhyeon.github.io

Juhyeon Mo의 개인 학술 홈페이지. Vite + React로 만든 단일 페이지 사이트이며,
GitHub Actions로 GitHub Pages에 자동 배포됩니다.

## 내용 수정

CV 내용은 전부 [`src/content.ts`](src/content.ts) 한 파일에 모여 있습니다.
프로필, 자기소개, 논문, News, Vitae 모두 여기서 고치면 됩니다.
`TODO` 주석이 달린 곳이 아직 값을 채워야 하는 항목입니다.

프로필 사진은 `public/profile.jpg`로 넣으면 About 화면에 표시됩니다.
(파일이 없으면 자리표시자 박스가 나옵니다.)

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 생성
```

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 빌드 후 GitHub Pages에 올립니다.
저장소 **Settings → Pages → Source**를 **GitHub Actions**로 한 번 설정해두어야 합니다.

## 구조

```
src/
├── content.ts               # ← CV 내용 전부
├── main.tsx
├── app/
│   ├── App.tsx              # 레이아웃 및 섹션 렌더링
│   └── components/ImageWithFallback.tsx
└── styles/index.css         # 디자인 시스템 (색상 토큰, 레이아웃)
```
