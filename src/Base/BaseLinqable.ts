import { Queryable } from "./Queryable";
import { IStandardLinq } from "../Interfaces/IStandardLinq";
import { InvalidOperationError } from '../Error';

export class BaseLinqable<T> extends Queryable<T> implements IStandardLinq<T>
{
    constructor(arr: Array<T>) {
        super(arr);
    }
    protected checkArray() {
        if (!this.array)
            throw new ReferenceError("ArgumentUndefinedError(array)");
    }
    /**
     * Returns the only element of a sequence, 
     * and throws an exception if there is not exactly one element in the sequence.
     * @throws {InvalidOperationError} The input sequence is empty. || The input sequence contains more than one element.
     */
    public Single(): T
    {
        this.checkArray();
        if(this.IsEmpty())
            throw new InvalidOperationError("The input sequence is empty.");
        if(this.Count() > 1)
            throw new InvalidOperationError("The input sequence contains more than one element.");
        return this.First();
    }
    public SingleOrDefault(defaultValue: T): T
    {
        this.checkArray();
        try
        {
            return this.Single();
        }
        catch(e)
        {
            return defaultValue;
        }
    }
    public Except(arr: Array<T> | number, comparer?: (x:T, y: T) => boolean)
    {
        let array: Array<T>;
        let element: T = null;
        comparer = comparer || this.EqualityComparer;
        if (!(arr instanceof Array)) 
            element = this.array[<number>arr];
        else 
            array = arr;
        var l = this.Count();
		var res = [];
		for (var i = 0; i < l; i++) {
			var k = array.Count();
            var t = false;
            if(element != null)
            {
                if (comparer(this.array[i], element) === true) {
                    t = true;
                    break;
                }
            }
            else
            {
                while (k-- > 0) {
            
                    if (comparer(this.array[i], array[k]) === true) {
                        t = true;
                        break;
                    }
                }
            }
			
			if (!t) res.push(this[i]);
		}
		return res;

    }
    public Zip<T3, T4>(arr: Array<T4>, selector: (x:T, y: T4) => T3): T3[]
    {
        return this
			.Take(Math.min(this.Count(), arr.Count()))
			.Select((t, i) => {
				return selector(t, arr[i]);
			});
    }
    public Union(arr: Array<T>): T[]
    {
        this.checkArray();
        return new BaseLinqable(this.array.concat(arr)).Distinct();
    }
    public Distinct(comparer?: (x: T, y: T) => boolean): Array<T>
    {
        this.checkArray();
        comparer = comparer || this.EqualityComparer;
        var arr = [];
		var l = this.Count();
		for (var i = 0; i < l; i++) {
			if (!arr.Contains(this.array[i], comparer))
                arr.push(this.array[i]);
        }
		return arr;
    }
    public Contains(el: T, comparer?: (x: T, y: T) => boolean)
    {
        this.checkArray();
        comparer = comparer || this.EqualityComparer;
		var l = this.Count();
		while (l-- > 0)
            if (comparer(this.array[l], el) === true) return true;
		return false;
    }
    public Count(predicate?: (element: T, index?: number) => boolean)
    {
        this.checkArray();
        if(!predicate)
            return this.array.length;
        return this.Where(predicate).ToArray().length;
    }
    public IsEmpty(): boolean {
        this.checkArray();
        return this.array.length == 0;
    }
    public All(predicate: (element: T) => boolean, context?: any): boolean {
        predicate = predicate || this.Predicate;
        let l = this.array.length;
        return this.Where(predicate, context).ToArray().length == l;
    }
    public Max(selector?: (element: T) => number): number {
        this.checkArray();
        var l = this.array.length;
        if (l == 0)
            return 0;
        selector = selector || <(element: T) => number><any>this.Selector;
        var max = selector(this.array[0]);
        if (typeof max !== "number")
            throw new InvalidOperationError("Element is not number.");
        while (l-- > 0)
            if (selector(this.array[l]) > max && isFinite(selector(this.array[l]))) max = selector(this.array[l]);
        return max;
    }
    public Min(selector?: (element: T) => number): number {
        this.checkArray();
        var l = this.array.length;
        if (l == 0)
            return 0;
        selector = selector || <(element: T) => number><any>this.Selector;
        var min = selector(this.array[0]);
        if (typeof min !== "number")
            throw new InvalidOperationError("Element is not number.");
        while (l-- > 0)
            if (selector(this.array[l]) < min && isFinite(selector(this.array[l]))) min = selector(this.array[l]);
        return min;
    }
    public MaxBy(selector: (element: T) => number): T {
        this.checkArray();
        var l = this.array.length;
        if (l == 0)
            throw new InvalidOperationError("Array Is Empty.");
        selector = selector || <(element: T) => number><any>this.Selector;
        var max = selector(this.array[0]);
        let FindedElement = <T>this.array[0];
        if (typeof max !== "number")
            throw new InvalidOperationError("Element is not number.");
        while (l-- > 0)
            if (selector(this.array[l]) > max && isFinite(selector(this.array[l]))) {
                max = selector(this.array[l]);
                FindedElement = this.array[l];
            }
        return FindedElement;
    }
    public MinBy(selector: (element: T) => number): T {
        this.checkArray();
        var l = this.array.length;
        if (l == 0)
            throw new InvalidOperationError("Array Is Empty.");
        selector = selector || <(element: T) => number><any>this.Selector;
        var min = selector(this.array[0]);
        let FindedElement = <T>this.array[0];
        if (typeof min !== "number")
            throw new InvalidOperationError("Element is not number.");
        while (l-- > 0)
            if (selector(this.array[l]) < min && isFinite(selector(this.array[l]))) {
                min = selector(this.array[l]);
                FindedElement = this.array[l];
            }
        return FindedElement;
    }
    public Sum(selector?: (element: T) => number, context?: any): number {
        this.checkArray();
        let num: number = 0;
        let arr: Array<number>;
        if (selector)
            arr = <Array<number>><any>this.array.Select(selector, context);
        else
            arr = <Array<number>><any>this.array;

        arr.forEach(element => {
            if (typeof element !== "number")
                throw new InvalidOperationError("Element is not number.");
            if (!isFinite(element) || isNaN(element)) { }
            else
                num += element;
        });

        return num;
    }
    public Last(predicate?: (element: T, index?: number) => boolean, context?: any): T {
        this.checkArray();
        var qwe = this._reverseArray(this.array);
        for (const source of qwe) {
            if (!predicate)
                return source;
            if (predicate(source)) {
                return source;
            }
        }
        throw new InvalidOperationError("No math")
    }
    public LastOrDefault(predicate?: (element: T, index: number) => boolean, defaultValue?: T, context?: any): T {
        this.checkArray();
        try {
            return this.Where(predicate, context).First(null, context);
        }
        catch (e) {
            return defaultValue;
        }
    }
    public Take(count: number): T[] {
        if (!count)
            count = 1;
        return this.array.slice(0, count);
    }
    public Select<TResult>(selector: (element: T, index: number) => TResult, context?: any): T[] {
        this.checkArray();
        var arr = [];
        var l = this.array.length;
        for (var i = 0; i < l; i++)
            arr.push(selector.call(this.getContext(context), this.array[i], i, this.array));
        return arr;
    }
    public First(predicate?: (element: T, index?: number) => boolean, context?: any): T {
        this.checkArray();

        for (const source of this.array) {
            if (!predicate)
                return source;

            if (predicate(source)) {
                return source;
            }
        }
        throw new InvalidOperationError("No math")
    }
    public FirstOrDefault(predicate?: (element: T, index: number) => boolean, def?: T, context?: any): T {
        this.checkArray();
        try {
            return this.Where(predicate, context).First(null, context);
        }
        catch (e) {
            return def;
        }
    }
    public Where(predicate: (element: T, index?: number) => boolean, context?: any): T[] {
        this.checkArray();
        var arr = [];
        var l = this.array.length;
        for (var i = 0; i < l; i++) {
            if (!this.array[i])
                continue;
            try {
                if (predicate.call(this.getContext(context), this.array[i], i, this) === true)
                    arr.push(this.array[i]);
            }
            catch (e) { }
        }
        return arr;
    }
    public Any(predicate?: (element: T) => boolean, context?: any): boolean {
        this.checkArray();
        predicate = predicate || this.Predicate;
        var f = this.array.some || function (p, c) {
            var l = this.array.length;
            if (!p) return l > 0;
            while (l-- > 0)
                if (p.call(c, this.array[l], l, this.array) === true) return true;
            return false;
        };
        return f.apply(this.array, [predicate, this.getContext(context)]);
    }
    public SelectMany<TCollection, TResult>(colSelector: (element: T, index?: number) => TCollection[], resSelector: (outer: T, inner: TCollection) => TResult): Array<TResult> {
        resSelector = resSelector || function <TCollection, TResult>(outer: T, res: TCollection): TResult {
            return <TResult><any>res;
        };
        return this.Aggregate((a, b) => {
            return (a as any as Array<{}>).concat(colSelector(b).Select((res) => {
                return resSelector(b, res);
            }));
        }, new Array<T>());
    }
    public ThenBy<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[] {
        this.checkArray();
        Comparer = Comparer || this.SortComparer;
        var arr = this.array.slice(0);
        var fn = (a: T, b: T) => {
            return Comparer(selector(a), selector(b));
        };
        return new BaseLinqable(arr).OrderBy(this.Selector, function (a, b) {
            var res = fn(a, b);
            return res === 0 ? Comparer(selector(a), selector(b)) : res;
        });
    }
    public ThenByDescending<TResult>(selector: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[] {
        this.checkArray();
        Comparer = Comparer || this.SortComparer;
        var arr = this.array.slice(0);
        var fn = (a: T, b: T) => {
            return Comparer(selector(a), selector(b));
        };
        return new BaseLinqable(arr).OrderBy(this.Selector, function (a, b) {
            var res = fn(a, b);
            return res === 0 ? -Comparer(selector(a), selector(b)) : res;
        });
    }
    public OrderBy<TResult>(selector?: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[] {
        this.checkArray();
        selector = selector || this.Selector;
        Comparer = Comparer || this.SortComparer;
        var arr = this.array.slice(0);
        var fn = (a: T, b: T) => {
            return Comparer(selector(a), selector(b));
        };
        return arr.sort(fn);
    }
    public OrderByDescending<TResult>(selector?: (element: T) => TResult, Comparer?: (a: TResult, b: TResult) => number): T[] {
        this.checkArray();
        selector = selector || this.Selector;
        Comparer = Comparer || this.SortComparer;
        var arr = this.array.slice(0);
        var fn = (a: T, b: T) => {
            return -Comparer(selector(a), selector(b));
        };
        return arr.sort(fn);
    }
    public Aggregate(selector: (el1: any, el2: any) => any, seed?: any): any {
        this.checkArray();
        var arr = this.array.slice(0);
        var l = this.array.length;
        if (seed == null || seed == undefined)
            seed = arr.shift();

        for (var i = 0; i < l; i++)
            seed = selector(seed, arr[i]);

        return seed;
    }

}