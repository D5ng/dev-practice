import { describe, expect, it } from "vitest"

import { removeChars } from "./remove-characters"

describe("removeChars", () => {
	it.each([
		["빈 문자열은 그대로 반환한다", "", ""],
		["b를 모두 제거한다", "bbbb", ""],
		["연속된 ac를 모두 제거한다", "acac", ""],
		["제거 대상이 없으면 원래 순서를 유지한다", "caa", "caa"],
		["예제: ab에서 b를 제거한다", "ab", "a"],
		["예제: abc에서 b 제거 후 생긴 ac도 제거한다", "abc", ""],
		["예제: cabbaabcca를 처리한다", "cabbaabcca", "caa"],
		["ac 제거 후 새롭게 생긴 ac도 제거한다", "aacc", ""],
	])("%s", (_description, input, expected) => {
		expect(removeChars(input)).toBe(expected)
	})
})
