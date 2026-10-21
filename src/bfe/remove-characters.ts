/**
 * BFE.dev - 165. remove characters
 *
 * a, b, c 세 가지 문자로만 구성된 문자열이 주어집니다.
 *
 * 문자열에서 다음 항목을 모두 제거하세요.
 * 1. 문자 'b'를 모두 제거합니다.
 * 2. 연속된 문자열 'ac'를 모두 제거합니다.
 *
 * 문자를 제거한 후 새롭게 만들어진 'ac'도 제거해야 합니다.
 *
 * @example
 * removeChars('ab') // 'a'
 * removeChars('abc') // ''
 * removeChars('cabbaabcca') // 'caa'
 *
 * cabbaabcca
 * caaacca
 * caaca
 * caa
 *
 * 입력 문자열은 'a', 'b', 'c'로만 구성됩니다.
 * 추가 제약 조건은 따로 주어지지 않습니다.
 *
 * 구현한 방식의 시간 복잡도와 공간 복잡도도 고려해 보세요.
 *
 * @param {string} input
 * @returns {string}
 */
export function removeChars(input: string) {
	if (input.length === 0) {
		return ""
	}

	let removedCharacters = [...input].filter((char) => char !== "b").join("")

	while (removedCharacters.includes("ac")) {
		const replaced = removedCharacters.replace("ac", "")

		if (replaced) {
			removedCharacters = replaced
		} else {
			return replaced
		}
	}

	return removedCharacters
}

/**
 * 목적
 * - 문자 b를 모두 제거하고, 연속된 문자열 'ac'를 모두 제거한 값을 반환한다
 *
 * 입력:
 * input: string
 *
 * 출력:
 * - 문자 b를 모두 제거하고, 연속된 문자열 'ac'를 모두 제거한 문자열
 *
 * 흐름:
 * "ab"
 * - 'b'를 제거
 * - 남은 'a' 반환
 *
 * "abc"
 * - 'b'를 제거
 * - 'ac' 제거
 * - '' (빈 문자열) 반환
 *
 * "cabbaabcca"
 * - 'b'를 모두 제거 => "caaacca"
 * - 'ac' 모두 제거 => "caaca" -> "caa"
 *
 * 처리:
 * 주어진 입력에서 'b'를 모두 제거 한다
 * 'b'가 제거된 입력에서 'ac'가 붙어있는지 확인한다
 * 만약 'ac'가 붙어있다면, 'ac'를 빈문자열로 변환한다
 * 다시 'ac'가 붙어있는지 확인하고, 'ac'가 있으면 빈문자열로 변환하도록 반복한다
 * 만약 'ac'를 제거하면서 제거된 입력이 빈문자열이라면 그대로 값을 반환한다
 *
 * 복잡도 예상:
 * n: `input` 문자열의 길이
 * 시간 복잡도: O(n2)
 * - 'b' 제거 O(n)
 * - 'ac' 제거
 * - while문에서 바깥의 반복 횟수는 최대 n/2번, 안쪽에서는 n번이 돈다.
 * 공간 복잡도: O(n)
 */
