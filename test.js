import HashMap from './hashMap.js';

// Test case 1: Testing set() and get() methods
const map = new HashMap();
map.set('key1', 'value1');
console.assert(map.get('key1') === 'value1', 'Test Case 1 Failed');

// Test case 2: Testing updating an existing key
map.set('key1', 'newValue');
console.assert(map.get('key1') === 'newValue', 'Test Case 2 Failed');

// Test case 3: Testing has() method
console.assert(map.has('key1') === true, 'Test Case 3 Failed');
console.assert(map.has('key2') === false, 'Test Case 3 Failed');

// Test case 4: Testing length() method
map.set('key2', 'value2');
console.assert(map.length() === 2, 'Test Case 4 Failed');

// Test case 5: Testing remove() method
map.remove('key1');
console.assert(map.get('key1') === null, 'Test Case 5 Failed');
console.assert(map.length() === 1, 'Test Case 5 Failed');

// Test case 6: Testing resizing behavior
for (let i = 0; i < 20; i++) {
    map.set(`key${i}`, `value${i}`);
}

console.assert(map.length() === 20, 'Test Case 6 Failed');
console.assert(map.get('key19') === 'value19', 'Test Case 6 Failed');

// Test case 7: Testing clear() method
map.clear();
console.assert(map.length() === 0, 'Test Case 7 Failed');
console.assert(map.get('key2') === null, 'Test Case 7 Failed');

// Test case 8: Testing keys() method
map.set('key1', 'value1');
map.set('key2', 'value2');
const keys = map.keys();
console.assert(keys.includes('key1') && keys.includes('key2'), 'Test Case 8 Failed');

// Test case 9: Testing values() method
const values = map.values();
console.assert(values.includes('value1') && values.includes('value2'), 'Test Case 9 Failed');

// Test case 10: Testing entries() method
const entries = map.entries();
console.assert(
    entries.some(([k, v]) => k === 'key1' && v === 'value1') && entries.some(([k, v]) => k === 'key2' && v === 'value2'),
    'Test Case 10 Failed'
);

console.log('All test cases passed!');
