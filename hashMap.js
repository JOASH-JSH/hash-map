export default class HashMap {
    constructor(size = 16) {
        this._buckets = Array.from({ length: size });
        this._size = size;
        this._fillcount = 0; // total number of buckets filled count
        this._pairscount = 0; // total number key-value pairs count
    }

    _hash(key) {
        let hashCode = 0;

        for (let i = 0; i < key.length; i++) {
            hashCode = (31 * hashCode + key.charCodeAt(i)) % this._size;
        }

        return hashCode;
    }

    _resize() {
        const tempBuckets = this._buckets;

        this._buckets = Array.from({ length: this._size * 2 });
        this._size = this._size * 2;
        this._fillcount = 0;
        this._pairscount = 0;

        tempBuckets.forEach((bucket) => {
            if (bucket) {
                bucket.forEach((item) => this.set(item[0], item[1]));
            }
        });
    }

    set(key, value) {
        if (this._fillcount > this._size * 0.75) {
            this._resize();
        }

        const index = this._hash(key);

        let bucket = this._buckets[index];

        if (!bucket) {
            this._buckets[index] = [];
            this._fillcount++;
            bucket = this._buckets[index];
        }

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (key === bucket[i][0]) {
                    bucket[i][1] = value;
                    return this;
                }
            }
        }

        bucket.push([key, value]);
        this._pairscount++;

        return this;
    }

    get(key) {
        const index = this._hash(key);

        const bucket = this._buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (key === bucket[i][0]) {
                    return bucket[i][1];
                }
            }
        }

        return null;
    }

    has(key) {
        return this.get(key) ? true : false;
    }

    remove(key) {
        const index = this._hash(key);
        const bucket = this._buckets[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (key === bucket[i][0]) {
                    if (i === 0) {
                        this._buckets[index] = bucket.slice(1).length ? bucket.slice(1) : undefined;

                        if (!this._buckets[index]) {
                            this._fillcount--;
                        }
                    } else {
                        this._buckets[index] = [...bucket.slice(0, i), ...bucket.slice(i + 1)];
                    }

                    this._pairscount--;

                    return true;
                }
            }
        }

        return false;
    }

    length() {
        return this._pairscount;
    }

    clear() {
        this._size = 16;
        this._fillcount = 0;
        this._pairscount = 0;
        this._buckets = Array.from({ length: this._size });
    }

    keys() {
        const keysArray = [];

        const pairs = this.entries();

        if (pairs.length) {
            for (let pair of pairs) {
                keysArray.push(pair[0]);
            }
        }

        return keysArray;
    }

    values() {
        const valuesArray = [];

        const pairs = this.entries();

        if (pairs.length) {
            for (let pair of pairs) {
                valuesArray.push(pair[1]);
            }
        }

        return valuesArray;
    }

    entries() {
        const pairs = [];

        for (let bucket of this._buckets) {
            if (bucket) {
                for (let item of bucket) {
                    pairs.push([item[0], item[1]]);
                }
            }
        }

        return pairs;
    }
}
