/**
 * BFE.dev - promisify()
 *
 * 에러 우선 콜백(error-first callback)은 첫 번째 인자로 에러를, 두 번째 인자로 데이터를 받습니다.
 * 에러가 있으면 에러를 처리하고, 없으면 데이터를 처리합니다.
 *
 * 마지막 인자로 이러한 에러 우선 콜백을 받는 비동기 함수를 생각해 봅시다.
 * 이 함수는 비동기 로직을 수행한 뒤, 실패하면 callback(someError)를,
 * 성공하면 callback(null, someData)를 호출합니다.
 *
 * promisify() 함수를 구현해 이러한 콜백 기반 함수를 Promise 기반 함수로 변환하세요.
 *
 * @example
 * ```ts
 * const func = (arg1, arg2, callback) => {
 *   // 비동기 로직 수행
 *   if (hasError) {
 *     callback(someError)
 *   } else {
 *     callback(null, someData)
 *   }
 * }
 *
 * const promisedFunc = promisify(func)
 *
 * promisedFunc(arg1, arg2)
 *   .then((data) => {
 *     // 데이터 처리
 *   })
 *   .catch((error) => {
 *     // 에러 처리
 *   })
 * ```
 *
 * 입력 범위나 추가 제약 조건은 따로 주어지지 않습니다.
 * 구현한 방식의 시간 복잡도와 공간 복잡도도 고려해 보세요.
 */
/** biome-ignore-all lint/suspicious/noExplicitAny: 여러 타입이 올 수 있기에 any로 설정 */

type ErrorFirstCallback<TData> = (error: unknown, data: TData) => void

export function promisify<TArgs extends unknown[], TData>(func: (...args: [...TArgs, ErrorFirstCallback<TData>]) => void) {
	return function (this: unknown, ...args: TArgs): Promise<TData> {
		return new Promise<TData>((resolve, reject) => {
			return func.call(this, ...args, (error: unknown, data: TData) => {
				if (error !== null && error !== undefined) {
					reject(error)
				} else {
					resolve(data)
				}
			})
		})
	}
}

/**
 * 목적:
 * `promisify` 함수는 전달받은 콜백 `func` 함수를 Promise 기반 함수로 변환하여 반환한다
 *
 * 입력:
 * `func`: (...args: [...TArgs, ErrorFirstCallback<TData>]) => void
 *
 * 출력:
 * - Promise 기반 함수로 변환한 함수
 * - (this, ...TArgs) => Promise<TData>
 * - 이행값(TData): 원본 func가 성공했을 때 전달한 데이터
 * - 거부값: 원본 func가 실패했을 때 전달한 에러. Promise<TData> 타입에는 드러나지 않는다
 *
 * 흐름:
 * [obj.promisified] 메서드로 호출된 경우
 * - `promisify(readFoo)`가 평가된다.
 * - 매개변수로 전달받은 `func` 함수는 값이 반환되어도 기억해야하므로, 클로저를 생성한다
 * - `obj`에 promisified 필드가 promisify(readFoo) 반환값을 저장한다.
 * - obj.promisified(1, 2, 3)를 호출한다
 * - new Promise로 프로미스 객체를 생성한다.
 * - promisified가 받은 this를 func 함수에 this 바인딩한다.
 * - func 함수에 비동기 타이머 객체인 setTimeout을 호출하고, 함수가 종료된다
 * - obj.promisified(1, 2, 3)은 Promise 객체이고 state는 pending 상태이다
 * - 50ms가 지나면 콜백 함수에 null, this.foo를 전달하여 호출하고, 프로미스 객체는 resolve되어 fulfilled 상태가 된다
 *
 * 처리:
 * - `Promise`상태에 따라 `func`를 호출하기 위해선, 함수가 선언된 환경을 기억해야하므로 매개변수를 받을 수 있도록 클로저 생성
 * - `promisify`는 Promise로 변환한 함수를 반환하기 때문에, `new Promise()`로 구현
 * - `func` 함수에 `args`를 전달하고, Promise 성공 여부 상태에 따라 callback 함수를 맨 마지막으로 전달
 * - 요구사항에 맞게, 첫 번째 인자는 에러가 들어오도록 두 번째 인자는 데이터를 받도록 인터페이스 구성
 * - 에러 값이 `null`, `undefined` 모두 아니라면 `reject`를 호출하고, 아니면 `resolve`를 호출한다
 *
 * 예외 처리:
 * - 메서드로 호출되었을 때(obj.promised) this 바인딩이 되어야 한다
 * - 콜백이 에러를 전달하면 에러로 거부되어야 한다
 * - 콜백이 값을 전달하면 값이 이행되어야 한다
 * - callback 함수에 첫번째 인자에 null, undefined이 아닌 falsy값이 들어오면 reject로 처리된다
 * - 콜백 함수가 비동기로 호출되어도 값이 이행되어야 한다
 * - 콜백이 2번 호출되어도 첫번째 결과만 반환된다
 * - 원본 함수가 동기적으로 예외를 던지면 그 예외로 거부된다
 *
 * 복잡도:
 * - `n`: 인수의 개수 (...args)
 * - 시간 복잡도 O(n)
 * - 공간 복잡도 O(n)
 */
