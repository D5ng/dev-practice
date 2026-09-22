import { describe, expect, it } from "vitest"

import { promisify } from "./promisify"

type DivideCallback = (error: Error | null, data?: number) => void

// 마지막 인자로 에러 우선 콜백을 받는 함수
const divide = (numerator: number, denominator: number, callback: DivideCallback) => {
	if (denominator === 0) {
		callback(new Error("0으로 나눌 수 없습니다"))
	} else {
		callback(null, numerator / denominator)
	}
}

type ReadFooCallback = (error: Error | null, data?: string) => void

// 비동기로 콜백을 호출하며, 자신의 this에서 값을 읽는 함수
function readFoo(this: { foo: string }, _arg1: number, _arg2: number, _arg3: number, callback: ReadFooCallback) {
	setTimeout(() => {
		console.log("this!!!", this.foo)
		callback(null, this.foo)
	}, 50)
}

type CallTwiceCallback = (error: Error | null, data?: string) => void

// 콜백을 두 번 호출하는 함수 (두 번째는 에러를 전달한다)
function callTwice(_arg1: number, callback: CallTwiceCallback) {
	callback(null, "첫번째")
	callback(new Error("두번째"))
}

type ThrowSyncCallback = (error: Error | null, data?: string) => void

// 콜백을 부르기 전에 동기적으로 예외를 던지는 함수
function throwSync(_arg1: number, _callback: ThrowSyncCallback) {
	throw new Error("동기 예외")
}

describe("promisify", () => {
	it("콜백이 데이터를 전달하면 그 값으로 이행된다", async () => {
		const promisedDivide = promisify(divide)

		await expect(promisedDivide(10, 2)).resolves.toBe(5)
	})

	it("콜백이 에러를 전달하면 그 에러로 거부된다", async () => {
		const promisedDivide = promisify(divide)

		await expect(promisedDivide(10, 0)).rejects.toThrow("0으로 나눌 수 없습니다")
	})

	it("콜백이 비동기로 호출되어도 그 값으로 이행된다", async () => {
		const obj = {
			foo: "BFE",
			promisified: promisify(readFoo),
		}

		await expect(obj.promisified(1, 2, 3)).resolves.toBe("BFE")
	})

	it("콜백이 두 번 호출되어도 첫 번째 결과만 반영된다", async () => {
		const promisedCallTwice = promisify(callTwice)

		await expect(promisedCallTwice(1)).resolves.toBe("첫번째")
	})

	it("원본 함수가 동기적으로 예외를 던지면 그 예외로 거부된다", async () => {
		const promisedThrowSync = promisify(throwSync)

		await expect(promisedThrowSync(1)).rejects.toThrow("동기 예외")
	})
})
