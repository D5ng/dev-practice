# dev-practice

JavaScript의 동작 원리를 직접 구현하고 응용하며 기본기를 다지는 연습 저장소입니다.

평소 가져다 쓰던 Promise, debounce, cloneDeep 같은 기능을 직접 만들며 원리를 익히고,
그 원리를 알고리즘 문제에 응용합니다.
빨리 답을 얻는 것보다, 스스로 답에 도달하는 과정을 남기는 것이 이 저장소의 목적입니다.

## 연습하는 방식

모든 문제를 같은 순서로 풉니다. 각 단계는 커밋과 PR에 그대로 남아 있습니다.

1. **분석** — 구현 전에 목적, 입출력, 엣지 케이스를 주석으로 정리합니다.
2. **테스트** — 예시와 엣지 케이스를 Vitest로 먼저 작성합니다.
3. **구현** — 테스트를 통과하는 코드를 작성합니다.
4. **다듬기** — 이름이 의도를 드러내는지, 각 부분이 어떤 책임을 맡는지 점검하며 리팩토링합니다.
5. **회고** — PR에 판단 근거, 검토했다가 버린 대안, 막혔던 지점을 기록합니다. ([PR 템플릿](.github/PULL_REQUEST_TEMPLATE.md))

예를 들어 [정수 → 로마 숫자](https://github.com/D5ng/dev-practice/pull/26)는
테스트 → 구현 → 네이밍 리팩토링 순서로 커밋되어 있습니다.

## 동작 원리 구현

| 구현 | 다진 기본기 | 기록 |
| --- | --- | --- |
| [CustomPromise](src/utility/custom-promise.ts) | Promise 상태 전이, then·catch 체이닝 | [#13](https://github.com/D5ng/dev-practice/pull/13) |
| [AsyncTaskQueue](src/utility/async-task-queue.ts) | 동시 실행 개수 제한, 실패해도 멈추지 않는 큐 | [#15](https://github.com/D5ng/dev-practice/pull/15) |
| [SequentialTaskQueue](src/utility/sequential-task-queue.ts) | 비동기 작업의 순차 실행 | [#16](https://github.com/D5ng/dev-practice/pull/16) |
| [debounce](src/utility/debounce.ts) | 클로저와 타이머 | [#10](https://github.com/D5ng/dev-practice/pull/10) |
| [curry](src/utility/curry.ts) | 클로저, 함수의 매개변수 개수(`fn.length`) | [#14](https://github.com/D5ng/dev-practice/pull/14) [#17](https://github.com/D5ng/dev-practice/pull/17) |
| [cloneDeep](src/utility/clone-deep.ts) | 순환 참조 처리(`WeakMap`), 재귀를 스택으로 바꾸기 | [#9](https://github.com/D5ng/dev-practice/pull/9) [#11](https://github.com/D5ng/dev-practice/pull/11) |
| [flatten](src/utility/flatten.ts) | 깊이 제한 평탄화, 재귀를 스택으로 바꾸기 | [#8](https://github.com/D5ng/dev-practice/pull/8) [#12](https://github.com/D5ng/dev-practice/pull/12) [#18](https://github.com/D5ng/dev-practice/pull/18) |
| [pick / omit](src/utility/pick_and_omit.ts) | 불변성을 지키는 객체 가공, 제네릭 타입 | [#7](https://github.com/D5ng/dev-practice/pull/7) |

## 응용: 알고리즘 문제 풀이

| 문제 | 다진 기본기 | 기록 |
| --- | --- | --- |
| [Two Sum](src/leetcode/twoSum.ts) | 완전 탐색 O(n²)에서 해시맵 O(n)으로 | [#20](https://github.com/D5ng/dev-practice/pull/20) |
| [올바른 괄호](src/leetcode/valid-parentheses.ts) | 스택 | [#28](https://github.com/D5ng/dev-practice/pull/28) |
| [두 정렬된 연결 리스트 병합](src/leetcode/merge-to-lists.ts) | 연결 리스트와 참조 | [#29](https://github.com/D5ng/dev-practice/pull/29) |
| [팰린드롬 숫자](src/leetcode/isPalindrome.ts) | 문자열 변환 없이 숫자 뒤집기 | [#22](https://github.com/D5ng/dev-practice/pull/22) |
| [가장 긴 공통 접두사](src/leetcode/longestCommonPrefix.ts) | 문자 위치별로 모든 문자열 비교 | [#24](https://github.com/D5ng/dev-practice/pull/24) |
| [로마 숫자 ↔ 정수](src/bfe/integer-to-roman.ts) | 변환 규칙을 데이터로 표현하기 | [#23](https://github.com/D5ng/dev-practice/pull/23) [#26](https://github.com/D5ng/dev-practice/pull/26) |
| [두 배열의 교집합](src/utility/get-intersection.ts) | 조회용 객체와 Set으로 중복 제거 | [#25](https://github.com/D5ng/dev-practice/pull/25) |
| [한 번만 등장하는 수](src/bfe/find-single.ts) | 등장 횟수 세기 | [#27](https://github.com/D5ng/dev-practice/pull/27) |
| [Array.prototype.last](src/leetcode/array-prototype-last.ts) | 프로토타입 확장 | [#21](https://github.com/D5ng/dev-practice/pull/21) |

LeetCode와 BFE.dev 문제입니다.
처음 시작할 때 푼 프로그래머스 Lv.0 풀이는 [src/level_0](src/level_0)에 있으며, 테스트를 도입하기 전이라 테스트 코드가 없습니다.

## AI를 쓰는 방식

AI에게 정답 코드를 받지 않습니다. 막힌 지점, 반례, 다음에 던질 질문만 받도록 규칙을 정해두었고,
분석·네이밍·책임 점검·리뷰 단계에서 쓰는 지침을 [.agents/skills](.agents/skills)에 두었습니다.

## 실행

TypeScript · Vitest · Biome · Husky(커밋 전 자동 포맷)

```bash
pnpm install
pnpm verify   # 타입 체크 + 린트 + 테스트
```
