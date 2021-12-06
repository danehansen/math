export declare function average(...args: any[]): number;
export declare function ceil(num: number, increment?: number): number;
export declare function circleIntersection(centerA: any, radiusA: number, centerB: any, radiusB: number): {
    x: any;
    y: any;
}[];
export declare function ease(current: number, dest: number, speed?: number): number;
export declare function easeProp(targ: any, key: string, dest: number, speed?: number): number;
export declare function euclid(a: any, b: any): any;
export declare function floor(num: number, increment?: number): number;
export declare function intLength(num: number): number;
export declare function luhn(num: number): boolean;
export declare function modulo(num: number, limit: number): number;
export declare function normalize(low: number, high: number, value: number): number;
export declare function primes(limit: number): any[];
export declare function random(limitA?: number, limitB?: number, round?: boolean, choke?: number): number;
export declare function randomItem(array: any, choke?: number): any;
export declare function randomDirection(): number;
export declare function randomBoolean(): boolean;
export declare function round(num: number, increment?: number): number;
export declare function shuffle(array: any[], duplicate?: boolean): any[];
export declare function sortAscending(a: number, b: number): number;
export declare function sortDescending(a: number, b: number): number;
export declare function splitUint(num: number): any[];
export declare function toDegrees(radians: number): number;
export declare function toDegreeDirection(radians: number): number;
export declare function toRadians(degrees: number): number;
export declare function toRadianDirection(degrees: number): number;
export declare function total(array: number[]): number;
