# linqable.ts 1.6 💥
LINQ 💥 implementation library for TypeScript ❄️


### Dependences 🔥
1. Yarn 1.7 or above
2. TypeScript 2.6 or above (in global)
3. AVA 1.0.0-beta.5 or above (in global)
4. Webpack 3.1.0 or above (in global)

### Install
- `yarn add linqable.ts`
- `npm i linqable.ts`

### Build ☄️
1. `yarn build`
2. You are great! 💫

### Test 🍒
1. `yarn test`
2. ava write test-report to screen

![image](https://user-images.githubusercontent.com/13326808/41032243-7248e6e8-698b-11e8-9329-d9ad7046222d.png)



### Usage 🌱
JS:   
```JavaScript
require("linqable.ts"); // import array extensions

console.log([3,5].Sum());
```
TS:   
```TypeScript
import "linqable.ts";

console.log([3,5].Sum());
```

Use Advanced & Base Linqable:
    
```TypeScript
import { AdvancedLinqable, BaseLinqable } from "linqable.ts";

console.log(new BaseLinqable([3,5]).Sum());
console.log(new AdvancedLinqable([3,5]).Acquire());
```


### API:
<hr/>   

**Standard API**


#### [First]OrDefault
Returns the first element of a sequence.   (Predicate Support)
```TypeScript
let array = [{formula: "CeO2", MolarMass: 172.115 }, {formula: "O", MolarMass: 15.999 }];

/* ... */

array.First() // => {formula: "CeO2", MolarMass: 172.115 }

let defaultValue = {formula: "H", MollarMass: 14.1 }
[].FirstOrDefault(null, defaultValue) // => {formula: "H", MollarMass: 14.1 }
```

#### [Last]OrDefault
Returns the last element of a sequence. (Predicate Support)
```TypeScript
let array = [{formula: "CeO2", MolarMass: 172.115 }, {formula: "O", MolarMass: 15.999 }];

/* ... */

array.Last() // =>  {formula: "O", MolarMass: 15.999 }

let defaultValue = {formula: "H", MollarMass: 14.1 }
[].LastOrDefault(null, defaultValue) // => {formula: "H", MollarMass: 14.1 }
```

#### Select
Projects each element of a sequence into a new form.  
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Nephren Ruq", age: 17}]

/* ... */

array.Select(x => x.name.split(' ').First()) // => [{name: "Chtholly"}, {"Nephren"}]
```


#### Where
Filters a sequence of values based on a predicate.
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, 
             {name: "Nephren Ruq", age: 17}, 
             {name: "Almaria Dufna", age: 19}, 
             {name: "Ithea Myse", age: 18}]

/* ... */
// where adult only 🙈
array.Where(x => x.age >= 18) // => [ {name: "Almaria Dufna", age: 19}, {name: "Ithea Myse", age: 18}]
```


#### Any
Determines whether any element of a sequence exists or satisfies a condition.     
```TypeScript
let array = [{name: "Chtholly Nola", IsDead: true}, 
             {name: "Nephren Ruq", IsDead: false}, 
             {name: "Almaria Dufna", IsDead: true}, 
             {name: "Ithea Myse", IsDead: true}]
/* ... */


array.Any(x => x.IsDead) // => true
array.Where(x => !x.IsDead).Any(x => x.IsDead) // => false
```

#### All
Determines whether all elements of a sequence satisfy a condition.
```TypeScript
let array = [{name: "Chtholly Nola", IsDead: true}, 
             {name: "Nephren Ruq", IsDead: false}, 
             {name: "Almaria Dufna", IsDead: true}, 
             {name: "Ithea Myse", IsDead: true}]
/* ... */


array.All(x => x.IsDead) // => false
array.Where(x => x.IsDead).All(x => x.IsDead) // => true
```

#### Sum
Computes the sum of the sequence of Decimal values that are obtained by invoking a transform function on each element of the input sequence.  
```TypeScript
let array1 = [1, 2, 3];
let array2 = [{num: 15}, {num: 10}];

/* ... */

array1.Sum() // => 6
array2.Sum(x => x.num) // => 25
```


#### IsEmpty
Gets a value indicating whether this array contains no elemets.   
```TypeScript
let array1 = [];
let array2 = ["Cobalt","Mithril"];

/* ... */

array1.IsEmpty() // => true
array2.IsEmpty() // => false
```

#### Min
Invokes a transform function on each element of a sequence and returns the minimum number value.  
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.Min(x => x.age) // => 17
```

#### Max
Invokes a transform function on each element of a sequence and returns the maximum number value.
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.Max(x => x.age) // => 18
```

#### Take 
Returns a specified number of contiguous elements from the start of a sequence.   
```TypeScript
let array = ["Cobalt","Mithril","Adamantium"];

/* ... */

array.Take(2) // => ["Cobalt","Mithril"]
```


#### OrderBy
Sorts the elements of a sequence in a particular direction (ascending, descending) according to a key.
```TypeScript
let array = [4, 2, 7, 3, 0, 6];

/* ... */

array.OrderBy(); // => [0, 2, 3, 4, 6, 7];
```
Supports primitives, including Date.  
To compare other objects, 
you need to implement interface IComparer (TypeScript)    
or implement function [`Compare(y) : number`]    

As well support Descending.


#### Reverse
Inverts the order of the elements in a sequence.  
```TypeScript
let array = [{name: "Chtholly Nola"}, 
             {name: "Nephren Ruq"}, 
             {name: "Almaria Dufna"}, 
             {name: "Ithea Myse"}]
/* ... */

array.Reverse() // => [{name: "Ithea Myse"},{name: "Almaria Dufna"},{name: "Nephren Ruq"},{name: "Chtholly Nola"}]
```

#### Distinct
Returns distinct elements from a sequence by using the default equality comparer to compare values.
```TypeScript
let array1 = ["Alkaloid", "Protein", "Chlorophyll", "Alkaloid"];

/* ... */

array1.Distinct() // => ["Alkaloid", "Protein", "Chlorophyll"]
```

#### Union
Produces the set union of two sequences.
```TypeScript
let array1 = ["Alkaloid", "Protein", "Chlorophyll", "Alkaloid"];
let array2 = ["Uranium", "Iridium", "Iridium", "Plutonium"];

/* ... */

array1.Union(array2) // => ["Alkaloid", "Protein", "Chlorophyll", "Uranium", "Iridium", "Plutonium"]
```

#### Zip
Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
```TypeScript
let woman = [ "Chtholly", "Nephren" ];
let man   = [ "Willem", "Willem" ];
woman.Zip(man, (w, m) => `${w} love ${m}`) // => ["Chtholly love Willem", "Nephren love Willem"]
```

#### Single[OrDefault]
Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
```TypeScript
let array = [{synthesis: "Nuclear"}, {synthesis: "Thermonuclear"}]

array.Single() // => Throw Error

/* ... */

array.SingleOrDefault({synthesis: "none"}) // => return default value // => {synthesis: "none"}

/* ... */

array = [{synthesis: "Nuclear"}];

/* ... */

array.Single() // => {synthesis: "Nuclear"}
```
  
**Advanced API**

#### Acquire
Ensures that a source sequence of objects are all acquired successfully. 
If the acquisition of any one fails then those successfully acquired till that point are delete

```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.Acquire(); // => success // => [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]
array.Acquire(); // => fail // => [] // => throw
```

#### Consume
Completely consumes the given sequence. 
This method uses immediate execution, and doesn't store any data during execution

```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.Comsume();
```

#### Batch
Batches the source sequence into sized buckets.

```TypeScript
let array = [{name: "Chtholly Nola"}, 
             {name: "Nephren Ruq"}, 
             {name: "Almaria Dufna"}, 
             {name: "Ithea Myse"}]

/* ... */

array.Batch(2); // => Iterator // => [[{name: "Chtholly Nola"}, {name: "Nephren Ruq"}],[{name: "Almaria Dufna"}, {name: "Ithea Myse"}]]
// Returns an array with 2 arrays 😏
```

#### MaxBy
Returns the maxima (maximal elements) of the given sequence, based on the given projection. 
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.MaxBy(x => x.age) // => { name: "Ithea Myse", age: 18 }
```

#### MinBy
Returns the minima (minimal elements) of the given sequence, based on the given projection. 
```TypeScript
let array = [{name: "Chtholly Nola", age: 17}, { name: "Ithea Myse", age: 18 }]

/* ... */

array.MinBy(x => x.age) // => {name: "Chtholly Nola", age: 17}
```


### RoadMap
#### Standard: 
- [x] First
- [x] FirstOrDefault
- [x] Last
- [x] LastOrDefault
- [x] Select
- [x] SelectMany
- [x] Where
- [x] Any
- [x] All
- [x] Sum
- [x] Take
- [ ] TakeWhile
- [x] Min & Max
- [x] MinBy & MaxBy
- [x] IsDefault
- [x] OrderBy
- [ ] Range
- [x] Reverse
- [x] Single
- [x] SingleOrDefault
- [ ] SkipWhile 
- [x] ThenBy
- [x] ThenByDescending
- [x] ToArray
- [x] Union
- [x] Zip
- [x] Aggregate
- [x] Count
- [ ] Average
- [ ] Append
- [x] Contains
- [x] DefaultIfEmpty
- [x] Distinct
- [x] Except
- [ ] GroupBy
- [ ] GroupJoin
- [ ] Join
#### Advanced:
- [x] Acquire
- [ ] AggregateRight
- [ ] Assert
- [ ] AssertCount
- [x] AtLeast
- [x] AtMost
- [ ] Backsert
- [x] Batch
- [ ] Cartesian 
- [ ] Choose
- [ ] Concat
- [x] Consume
- [ ] CountBetween & CountBy & CountDown & CompareCount
- [ ] EndsWith
- [ ] EquiZip
- [ ] DistinctBy
- [ ] Exactly
- [ ] ExceptBy
- [ ] Exclude
- [ ] FallbackIfEmpty
- [ ] FillBackward & FillForward
- [ ] Flatten
- [ ] Fold
- [ ] From
- [ ] FullGroupJoin
- [ ] FullJoin
- [ ] Generate & GenerateByIndex
- [ ] GroupAdjacent
- [ ] Index
- [ ] Insert
- [ ] Interleave
- [ ] Lag
- [ ] Lead
- [ ] LeftJoin
- [ ] Move
- [ ] OrderedMerge
- [ ] Pad & PadStart
- [ ] Pairwise
- [ ] PartialSort & PartialSortBy
- [ ] Partition
- [ ] Permutations
- [ ] Pipe
- [ ] Prepend
- [ ] PreScan
- [ ] Random & RandomDouble & RandomSubset
- [ ] Rank & RankBy
- [ ] Repeat
- [ ] RightJoin
- [ ] RunLengthEncode
- [ ] Scan & ScanRight
- [ ] Segment
- [ ] Sequence
- [ ] Shuffle
- [ ] SkipLast & SkipUntil
- [ ] Slice
- [ ] SortedMerge
- [ ] Split
- [ ] StartsWith
- [ ] Subsets
- [ ] TagFirstLast
- [ ] TakeEvery & TakeLast & TakeUntil
- [ ] ZipLongest & ZipShortest

### License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2F0xF6%2Flinq.ts.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2F0xF6%2Flinq.ts?ref=badge_large)
