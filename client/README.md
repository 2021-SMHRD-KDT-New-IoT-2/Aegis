# React-Tailwind-Jit-Starter-pack 🍩

## Start Step 🚀
1 . Clone the file to user local 

```
git clone https://github.com/gojaebeom/react-tailwind-jit-starterpack.git
```

2 . Download the package.json's dependencies

```
npm install
```
3 . Prepare two cmd and enter each command

```
npm run watch
npm start
```

## StartPack Default Option ✨
- Tailwind Jit 환경 구성 
- React-router-dom 6Ver 사용
- Recoil 전역상태관리 라이브러리 추가 및 설정
- 커스텀 디렉토리 구조 사용 (Storybook 프레임워크 추가로 변경)
  - 아토믹 디자인은 소규모 프로젝트에 적합하지 않아 개인적으로 자주사용하는 디렉토리 구조 적용
  - 작은 단위의 컴포넌트부터 컴포넌트들의 집합(페이지 단위)까지 `components` 폴더에서 관리
  - 컴포넌트들을 모아 하나의 페이지 단위로 조합되는 컴포넌트를 `pages` 폴더로 분류
  - 로컬 또는 전역 상태를 포함하는 컴포넌트는 `containers` 폴더로 분류
  - 상태를 포함하지 않고 외부에서 주입받아 사용되는 컴포넌트를 `storybook` 폴더로 분류, 스토리북페이지를 통해 해당 컴포넌트의 UI, 속성등에 대한 정보 확인 가능
- PWA 환경 구성
  - https만 연결하면 됨
- 상대경로 x -> 절대경로
  - `jsconfig.json` 파일 적용으로 외부 컴포넌트를 절대경로로 import

