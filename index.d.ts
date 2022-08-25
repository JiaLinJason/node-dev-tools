export = jarvis;

declare namespace jarvis {
    /**
     * @param startTime time stamp before the loop, record how much time it cost
     * @param printPercent default true, if false, print like 1/100 instead of 1%
     */
    export type PercentBar = {
        startTime?: number;
        printPercent?: boolean;
    };
    /**
     * asynchronous function returns in designative time
     * @param ms millsecond
     */
    export function sleep(ms?: number): Promise<void>;
    /**
     * use JSON module to simply clone an object, low performance
     * @param obj source object to clone
     */
    export function jsonClone<T>(obj: T): T;
    /**
     * clone an object by recursion, to avoid same reference for same memory address
     * @param obj 
     */
    export function deepClone<T>(obj: T): T;
    /**
     * generate a random number from min to max
     * @param min minimum bundary
     * @param max maximum bundary
     */
    export function random(min: number, max: number): number;
    /**
     * unique an array data by using Set
     * @param arr origin data
     */
    export function unique(arr: Array<any>): Array<any>;
    /**
     * parse millsecond number to time span string
     * @param mills 
     * @returns time span
     */
    export function parseTimespan(mills: number): string;
    /**
     * print a process in a loop, with time options
     * @param current current number for loop
     * @param total total number for loop
     * @param options options for function
     */
    export function printPercent(current: number, total: number, options?: PercentBar): void;
    /**
     * if call this function, Date prototype will load a format function, eg: new Date().format("YYYY-MM-DD")
     */
    export function enableOriginFormat(): void;
    /**
     * * data form:
     * [
     *  ['head0', 'head1', 'head2', 'head3'],
     *  ['row00', 'row01', 'row02', 'row03'],
     *  ['row10', 'row11', 'row12', 'row13'],
     *  ['row20', 'row21', 'row22', 'row23']
     * ]
     * @param path output filepath, include file name
     * @param data sheet data
     */
    export function outputExcel(path: string, data: Array<Array<string>>): void;
    /**
     * read one xlsx file, returns Array
     * @param path input filepath, include file name
     */
    export function readExcel(path: string): Array<any>;
    /**
     * find innner variable without throwing error
     * eg: safeFind(myObj, "level1,level2.level3.target")
     * @param obj source object
     * @param target a path to find inner variable
     */
    export function safeFind(obj: any, target: string): any;
}
