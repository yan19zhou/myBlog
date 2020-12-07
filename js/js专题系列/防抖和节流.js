#### 防抖
    // 防抖 触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
   
    /**
    * @desc 函数防抖
    * @param func 函数
    * @param wait 延迟执行毫秒数
    * @param immediate true 表立即执行，false 表非立即执行
    */
    function debounce(func,wait,immediate) {
        let timeout;

        return function () {
            let context = this;
            let args = arguments;

            if (timeout) clearTimeout(timeout);
            if (immediate) {
                var callNow = !timeout;
                timeout = setTimeout(() => {
                    timeout = null;
                }, wait)
                if (callNow) func.apply(context, args)
            }
            else {
                timeout = setTimeout(function(){
                    func.apply(context, args)
                }, wait);
            }
        }
    }

#### 节流

    就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。   
    /**
    * @desc 函数节流
    * @param fn 函数
    * @param interval 延迟执行毫秒数
    */
	export function _throttle(fn, interval) {
		var last;
		var timer;
		var interval = interval || 200;
		return function () {
			var th = this;
			var args = arguments;
			var now = +new Date();
			if (last && now - last < interval) {
				clearTimeout(timer);
				timer = setTimeout(function () {
					last = now;
					fn.apply(th, args);
				}, interval);
			} else {
				last = now;
				fn.apply(th, args);
			}
		}
	}

